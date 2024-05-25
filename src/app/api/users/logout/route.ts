import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDB();

export async function POST(request: NextRequest) {
    try{
        
        cookies().delete("token");
        return NextResponse.json({
            msg: "User is logged out"
        })
    }catch(e){
        return NextResponse.json({error: "Error in user log-out"})
    }
}
