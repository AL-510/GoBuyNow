import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


export const Connection = async() => {
    
    try {
        await mongoose.connect(process.env.URL);
        console.log('DB connected');
    } catch (error) {
        console.log("Error while connecting DB", error.message);
    }
}

export default Connection;