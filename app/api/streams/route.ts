import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
const regex = new RegExp("/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/") 

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req:NextRequest){
    try{
        const data = CreateStreamSchema.parse(await req.json())
        const isYt = regex.test(data.url);
        if(!isYt){
            return NextResponse.json({
                message: "wrong url"
            },{
                status:411
            })
        }
        const extractedId = data.url.split("?v=")[1];

        await prismaClient.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId: extractedId,
                type: "Youtube"
            }
        }) 
    }
   catch(e){
    return NextResponse.json({
        message: "Error while adding a stream"
    },{
        status:411
    })
   }

}