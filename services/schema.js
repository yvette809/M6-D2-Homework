const {Schema} = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")

const StudentSchema = new Schema(
    {
        
        name: {
            type:String,
            required: [true, "A student must have a name"],
            unique:true
        },
        surname:{
            type:String,
            required:[true, "A student must have a surname"]

        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:{
                validator:async(value) =>{
                    if(!v.isEmail(value)){
                        throw new Error ("Email is invalid")
                    }else{
                        //  read in the db if the email is in use
                        const checkEmail = await studentModel.findOne({email:value})
                        if (checkEmail){
                            throw new Error("email already exist!")
                        }
                    }
                }
            }
        },
        dateOfBirth:{
            type:String,
            required:true
        },
        country:{
            type:String,
        required:true
        },
        // projects:[{
               
        //     type:Schema.Types.ObjectId,
        //     ref:'projects',
        
        //    }]
           

       
           

})
StudentSchema.post("validate", (error,doc,next)=>{
    if(error){
        error.httpStatusCode = 400
        next(error)
    }else{
        next()
    }
})



const studentModel = mongoose.model("Student", StudentSchema)
module.exports = studentModel