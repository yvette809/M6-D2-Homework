const express = require("express")
const StudentSchema = require("../schema")

const studRouter = express.Router()

// get all students

studRouter.get("/", async (req,res,next)=>{
    try{
        const students = await StudentSchema.find(req.query)
        res.send(students)
    }catch(error){
       next(error)
    }
})

// get student with a specific id
studRouter.get("/:id", async (req,res,next)=>{
    try{
        const id = req.params.id
        const student = await StudentSchema.findById(id)
        if(student){
            res.send(student)
        }else{
            const error = new Error()
            error.httpStatusCode = 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})


// create a new student
studRouter.post("/", async(req,res,next)=>{
    try{
        const newStudent = new StudentSchema(req.body)
        const{_id} = await newStudent.save()
        res.status(201).send(_id)

    }catch(error){
        next(error)
    }
})

// update a single student
studRouter.put("/:id", async(req,res,next)=>{
    try{
        const student = await StudentSchema.findByIdAndUpdate(req.params.id,req.body)
        console.log(student)
        if(student){
            res.send(student)
        }else{
            const error = new Error(`student with id ${req.params.id} not found`)
            error.httpStatusCode = 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})

// delete student with a specific id

studRouter.delete("/:id", async (req,res,next)=>{
    try{
        const student = await StudentSchema.findByIdAndDelete(req.params.id)
        if(student){
            res.send("deleted")
        }else{
            const error = new Error(`student with id  ${req.params.id} not found`)
            error.httpStatusCode= 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})














module.exports = studRouter