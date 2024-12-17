import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
const UpvoteSchema = z.object({
    streamId: z.string(),
})

export async function POST(req:NextRequest) {
    
    try{
       const data = UpvoteSchema.parse(await req.json());
       await prismaClient.upvotes.create({
        data:{
            streamId: data.streamId
        }
       })
       return NextResponse.json({
          message: "Successful"
       })
    }catch(e){
        return NextResponse.json({
            message: "Error while upvoting"
        },{
            status:403
        })
    }

  }