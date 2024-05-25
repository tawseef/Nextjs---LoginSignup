import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getFromToken } from "@/util/getFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try{
        const userId = getFromToken();
        console.log("userId");
        const user = await User.findById(userId);
        return NextResponse.json({msg: "User found", data: user})
    }catch(e){
        return NextResponse.json({error: "Error in getting token"})
    }
}