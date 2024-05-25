import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

connectDB();

export async function POST(request:NextRequest) {
    try{
        const {username, email, password} = await request.json();
        // console.log(username, email, password);
        
        const findingUser =  await User.findOne({email});
        if(findingUser) return NextResponse.json({"error":"User Already Exist"});
        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await  bcrypt.hash(password,salt);
        
        const newUser = new User({
            username, email, password: hashedPassword
        });

        await newUser.save();
        // console.log(savedUser);

        return NextResponse.json({
            msg: "User registered successfully", username: newUser.username
        })

    }catch(e){
        return NextResponse.json({"error": "Error in Post function in signup"}, {status: 404});
    }    
}

