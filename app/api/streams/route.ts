import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api"

const regex = new RegExp("^(https?:\\/\\/)?(www\\.)?(youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11})$");
const CreateStreamSchema = z.object({
    spaceId: z.string(),
    url: z.string()
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const isYt = regex.test(body.url);
        if (!isYt) {
            return NextResponse.json({
                message: "wrong url format"
            }, {
                status: 411
            });
        }

        const data = CreateStreamSchema.parse(body);
        console.log("Request body:", data);

        // Extract video ID from the URL
        let extractedId;
        if (data.url.includes("youtu.be")) {
            extractedId = data.url.split("youtu.be/")[1];
        } else if (data.url.includes("watch?v=")) {
            extractedId = data.url.split("watch?v=")[1].split("&")[0]; // Handle additional parameters
        }

        if (!extractedId) {
            return NextResponse.json({
                message: "Could not extract video ID from URL"
            }, {
                status: 400
            });
        }
        let res;
        try {
            res = await youtubesearchapi.GetVideoDetails(extractedId);
        } catch (apiError) {
            console.error("Error fetching video details:", apiError);
            return NextResponse.json({
                message: "Error fetching video details"
            }, {
                status: 500
            });
        }
        //  console.log(res);
        const title = res.title;
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: Number }, b: { width: Number }) => a.width < b.width ? -1 : 1);
        //  console.log(title);
        //  console.log(thumbnails[thumbnails.length-1]);
        const stream = await prismaClient.stream.create({
            data: {
                spaceId: data.spaceId,
                url: data.url,
                extractedId: extractedId,
                type: "Youtube",
                title: title,
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "",
                bigImg: (thumbnails[thumbnails.length - 1].url) ?? ""
            }
        });

        return NextResponse.json({
            message: "Successfully added Stream",
            id: stream.id
        });
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error while adding a stream:", e.message);
        } else {
            console.error("Unexpected error:", e);
        }
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    const spaceId = req.nextUrl.searchParams.get("spaceId");
    const streams = await prismaClient.stream.findMany({
        where: {
            spaceId: spaceId ?? ""
        }
    });
   

    return NextResponse.json({
        streams
    });
}