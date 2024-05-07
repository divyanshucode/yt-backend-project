
import mongoose , {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    fullname :{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, //we will use cloudinary to store the image url
        required: true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        required:[true, "Password is required"],
    },
    refreshToken:{
        type: String,
    },
    
},{timestamps: true})

//pre middleware hook
//pre hook is a middleware function that just perform operation before
//the data is saved ( actual operation is performed)


//pre have many options like save, validate, remove, updateOne, deleteOne, deleteMany
//we have used save (whenever we save a password perform this) and then a async function
//for next operation of middleware
//why async , 1. needs the context of this which is not possible in arrow/normal function
//2.db operation takes time thats why async


//we want it to run it only when our password is modified 
//if not modified then just move to next operation
//isModified is an inbuilt function of mongoose

//bcrypt is used to hash the password
//10 is no of rounds of hashing



userSchema.pre("save", async function (next) {
     if(!this.isModified("password")) return next()
    
    
     this.password = await bcrypt.hash(this.password,10)
     next()
})

//code to compare the actual password and encrypted data
//this.password is encrypted password

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password) //return the boolean value
}

//both are same only difference is in how we use it
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY  
    }
   )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
        _id: this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY  
    }
   )
}

export const User = new mongoose.model("User", userSchema)