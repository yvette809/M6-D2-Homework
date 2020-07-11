const {Schema} = require("mongoose")
const mongoose = require("mongoose")

const projectSchema = new Schema({
   
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    repoURL:{
        type:String,
        required:true
    },
    liveURL:{
        type:String,
        required:true
    },
    studentID:{
        type:String,
        required:true
    },
    image:String

})

const projectModel = mongoose.model("project", projectSchema)
module.exports = projectModel
