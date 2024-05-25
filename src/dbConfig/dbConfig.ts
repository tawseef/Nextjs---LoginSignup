import mongoose from "mongoose";

export async function connectDB() {
    try{
        await mongoose.connect(process.env.DB_URI!);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("MongoDB connected")
        })

        connection.on("error", (e)=>{
            console.log("MongoDB connection error ", e);
            process.exit();
        })
    }catch(error){
        console.log("Database Connection Error");
    }    
}