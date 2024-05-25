import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getFromToken = ()=>{
    try{
        const cookiesStore = cookies(); 
        const token = cookiesStore.get("token")?.value;
        if (!token) {
            throw new Error("No token found");
        }

        const verifiedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
            console.log("verifiedToken")        
        return verifiedToken.id;

    }catch(e){

        return NextResponse.json({error: "No token found"});
    }
}