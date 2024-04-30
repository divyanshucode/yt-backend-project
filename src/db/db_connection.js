

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//made a connectDB function in new file db_connection.js and imported it in index.js

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` )
        console.log("MongoDB connected")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        //this helps to understand on which db i am connected : production or development or etc
        //mongoose.connect returns a promise 


    }catch (error){
        console.log(" MONGO_DB CONNECTION ERROR :",error)
        process.exit(1)
    }
}

export default connectDB 