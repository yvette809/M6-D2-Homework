const {Schema} = require("mongoose")
const mongoose = require("mongoose")

const projectSchema = new Schema({
    _id: String,
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
    }

})

const projectModel = mongoose.model("project", projectSchema)
module.exports = projectModel
