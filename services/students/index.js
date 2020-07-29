const express = require("express")
const StudentSchema = require("../schema")
const projectModel = require("../projects/schema")
const q2m= require("query-to-mongo")

const studRouter = express.Router()

// get all students
// sol1:
studRouter.get("/", async (req,res,next)=>{
    const{sort,skip,limit} = req.query
    delete req.query.skip
    delete req.query.limit
    delete req.query.sort
    try{
        const students = await StudentSchema.find(req.query).populate('projects')
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
// studRouter.get("/", async (req, res, next) => {
//     try {
    
//       const students = await StudentSchema.find(req.query).populate('project', 'name')
        
//     res.status(200).send(students)
        
//     } catch (error) {
//       next(error)
//     }
//   })


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

//get projects of a particular student
//sol 1
studRouter.get("/:_id/projects",  async (req,res,next)=>{
  try{
      
    const project = await projectModel.find(req.query)
    let numberOfProjects = 0
    filteredP = project.filter(p => p.studentID === req.params._id)
    if(filteredP){
        numberOfProjects += 1
        filteredP.push(numberOfProjects)
        res.status(200).send(filteredP)
    }else{
        const error = new Error("could.t get project")
        error.httpStatusCode = 404
        next(error)
    }
    

  }catch(error){
      next(error)
  }

})

// sol 2

// get projects for different students
studRouter.get("/:_id/projects", async (req, res, next) => {
    try {
      const id = req.params._id
      const project = await  projectModel.findById(id)
      if (project) {
        res.send(project)
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next("While reading experience list a problem occurred!")
    }
  })

  // get a specific project for a specific student
  studRouter.get("/:_id/projects/:projId", async (req, res, next) => {
    try {
      const findUserProj = await projectModel.findById(
        {
          id: req.params._id,
          projId: req.params.projId,
        },
        
      );
      if (findUserProj) {
          res.status(200).send(findUserProj)
      }else{
       res.status(404).send("Not found")
      };
    } catch (error) {
      next(error);
    }
  });

// create a new student
studRouter.post("/", async(req,res,next)=>{
    try{
        const newStudent = await new StudentSchema(req.body)
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