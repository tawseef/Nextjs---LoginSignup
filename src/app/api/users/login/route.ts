import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectDB();

export async function POST(request: NextRequest) {
    try{

        const {email, password} = await request.json();
        
        const findingUser =  await User.findOne({email});
        // console.log("findingUser")
        
        if(!findingUser) return NextResponse.json({error: "User not found"});
        
        
        const passwordCompare = await bcrypt.compare(password,findingUser.password)
        
        if(!passwordCompare) return NextResponse.json({error: "Passwords incorrect"});
        
        const payload = {id: findingUser._id};
        
        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        
        cookies().set("token", token)
        // console.log(localStorage.getItem("token"));

        return NextResponse.json({message: "Logged-in"});

    }catch(e){
        return NextResponse.json({error: "Error in user login"})
    }
}