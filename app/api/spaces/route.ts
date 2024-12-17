import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";


const SpaceSchema = z.object({
    name: z.string(),
    category: z.string(),
    email : z.string()
})

export async function  POST(req:NextRequest){
    
    const body = await req.json();
    const userId = await prismaClient.user.findFirst({
        where:{
            email:body.email
        }
    })
   
    try{
        const data = SpaceSchema.parse(body);
        console.log(data);
        const res = await prismaClient.user_space.create({
            data:{
                userId: userId?.id || "",
                name: data.name, 
                category: data.category
            }
        })
        
        return NextResponse.json({
            message : "Successful"
        })

    }catch(e){
        console.log(e);
        return NextResponse.json({
            message: "Wrong Inputs"
        })
    }
}

export async function  GET(req:NextRequest){
    const email = req.nextUrl.searchParams.get("email");
    let userId
    try{
        const data = await prismaClient.user.findFirst({
            where:{
                  email:email ?? ""
            }
        })
         userId = data?.id;
    }catch(e){
        return NextResponse.json({
            message: "User Not Found with that Email"
        },{
            status:404
        })
    }
    let spaces;
    try{
        spaces = await prismaClient.user_space.findMany({
            where:{
                userId:userId
            }
        })
    }catch(e){
        return NextResponse.json({
            message: "Spaces Not Found with the Email"
        },{
            status:404
        })
    }
     
    return NextResponse.json({
        spaces
    },{
        status:200
    })
}