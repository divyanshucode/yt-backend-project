import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
   
}))


//allowing json in our application with limit of 16kb
app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}));//allowing urlencoded data in our application
//what is urlencoded data? it is data that is sent from the client to the server in the form of a query string

app.use(express.static("public"));//allowing static files to be served from the public folder
//mostly used for images, css, and js files (assets)

app.use(cookieParser());//allowing cookies to be parsed in our application  (cookies are small pieces of data that are stored in the client's browser)



//what is middleware?
//middleware is a function that has access to the request and response objects
//example would be : let say you hitting /instagram and the res method is to get all the post from the database
//middleware act as middle function and can be used to check if the user is authenticated or logged in before they can access the post
//next is a function that is called when the middleware has completed its work
//it act as a flag that tells the middleware to move to the next middleware in the stack or move to response method
export { app }