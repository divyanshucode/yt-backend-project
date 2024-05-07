import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
{
   videoFile:{
    type:String,//we will use cloudinary to store the video url
    required: true,
   },
   thumbnail:{
    type:String,//we will use cloudinary to store the image url
    required: true,
   },
   title:{
    type:String,
    required: true
   },
    description:{
     type:String,
     required: true,
    },
    duration:{
        type:Number,//can get from cloudinary
        required: true,
    },
    views:{
        type:Number,
        default: 0,
    },  
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
   
},
{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = new mongoose.model("Video", videoSchema)