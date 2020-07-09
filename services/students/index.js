const express = require("express")
const StudentSchema = require("../schema")
const projectModel = require("../projects/schema")
const q2m= require("query-to-mongo")

const studRouter = express.Router()

// get all students
sol1:
studRouter.get("/", async (req,res,next)=>{
    const{sort,skip,limit} = req.query
    delete req.query.skip
    delete req.query.limit
    delete req.query.sort
    try{
        const students = await StudentSchema.find(req.query, {email:1})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({[sort]: -1})
        //const students = await StudentSchema.find(req.query, {email:1}).skip(4).limit(5).sort({email:1})
        res.send(students)
    }catch(error){
       next(error)
    }
})

//sol2:
studRouter.get("/", async (req, res, next) => {
    try {
      const query = q2m(req.query)
      const students = await studentSchema.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
  
      res.send({
        data: students,
        total: students.length,
      })
    } catch (error) {
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

// get projects of a particular student
studRouter.get("/:id/projects",  async (req,res,next)=>{
  try{
      
    const project = await projectModel.find(req.query)
    filteredP = project.find(p => p.studentID === req.params.id)
    res.status(200).send(filteredP)

  }catch(error){
      next(error)
  }

})


// create a new student
studRouter.post("/", async(req,res,next)=>{
    try{
        const newStudent = new StudentSchema(req.body)
        const response = await newStudent.save()
        res.status(201).send(response)

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