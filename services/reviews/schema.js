const mongoose = require("mongoose")
const{Schema} = require("mongoose")


const ReviewsSchema = new Schema({
    comment:{
        type:String,
        required:[true, 'A review must have a comment']
    },
    rating:{
        type:Number,
        required:[true, 'A review must have a rating']
        
    },
    projectID:{
        type:String,
        required:true
    }
})


const ReviewsModel = mongoose.model("Review",  ReviewsSchema)
module.exports = ReviewsModel