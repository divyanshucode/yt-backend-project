//require("dotenv").config(); ... old method
import dotenv from "dotenv";
import connectDB from "./db/db_connection.js"


dotenv.config({
   path:'./env'
});

 connectDB()
 .then(()=>{
   app.listen(process.env.PORT || 8000,()=>{
      console.log(`Server is running on port ${process.env.PORT }`);
   })
 })
 .catch((err) => console.log("MONDO DB CONNECTION ERROR", err));
 