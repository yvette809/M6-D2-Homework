const {Schema} = require("mongoose")
const mongoose = require("mongoose")

const StudentSchema = new Schema(
    {
        
        name: String,
        surname:String,
        email:String,
        dateOfBirth:String,
        country:String

})


module.exports = mongoose.model("Student", StudentSchema)