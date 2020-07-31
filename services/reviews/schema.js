const mongoose = require("mongoose")
const{Schema} = require("mongoose")


const ReviewsSchema = new Schema({
    name:{
        type:String,
        required:[true, 'A review must have a name']
    },
    rating:{
        type:Number,
        
    },
})


const ReviewsModel = mongoose.model("Review",  ReviewsSchema)
module.exports = ReviewsModel