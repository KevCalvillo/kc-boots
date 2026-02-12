import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try{
        const { id } = await params;
        const {status} = await req.json()
        const order = await prisma.order.update({
            where:{id},
            data:{status}
        })
        return NextResponse.json(order)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:error.message}, {status:500})
    }
}