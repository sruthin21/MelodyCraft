import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api"

const regex = new RegExp("^(https?:\\/\\/)?(www\\.)?(youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11})$");
const CreateStreamSchema = z.object({
    creatorId: z.string(),
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
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
      //  console.log(res);
        // const title = res.title;
         const thumbnails = res.thumbnail.thumbnails;
        //  thumbnails.sort((a: {width:Number},b:{width:Number}))
        
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId: extractedId,
                type: "Youtube"
            }
        });

        return NextResponse.json({
            message: "Successfully added Stream",
            id: stream.id
        });
    } catch (e) {
        console.error("Error while adding a stream:", e);
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    });

    return NextResponse.json({
        streams
    });
}