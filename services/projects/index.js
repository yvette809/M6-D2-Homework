const express = require("express")
const projectModel = require("./schema")
const projectRouter = express.Router()


// get all projects

projectRouter.get("/", async (req, res, next) => {
    try {
      const query = q2m(req.query)
      const projects = await projectModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
  
      res.send({
        data: projects,
        total: projects.length,
      })
    } catch (error) {
      next(error)
    }
  })


// get project with a specific id
projectRouter.get("/:id", async (req,res,next)=>{
    try{
        const id = req.params.id
        const project = await projectModel.findById(id)
        if(project){
            res.send(project)
        }else{
            const error = new Error()
            error.httpStatusCode = 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})


// create a new project
projectRouter.post("/", async(req,res,next)=>{
    try{
        const newProject = await new projectModel(req.body)
        const response = await newProject.save()
        res.status(201).send(response)

    }catch(error){
        next(error)
    }
})

// update a single project
projectRouter.put("/:id", async(req,res,next)=>{
    try{
        const project = await projectModel.findByIdAndUpdate(req.params.id,req.body)
        console.log(project)
        if(project){
            res.send(project)
        }else{
            const error = new Error(`project with id ${req.params.id} not found`)
            error.httpStatusCode = 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})

// delete project with a specific id

projectRouter.delete("/:id", async (req,res,next)=>{
    try{
        const project = await projectModel.findByIdAndDelete(req.params.id)
        if(project){
            res.send("deleted")
        }else{
            const error = new Error(`project with id  ${req.params.id} not found`)
            error.httpStatusCode= 404
            next(error)
        }

    }catch(error){
        next(error)
    }
})














module.exports = projectRouter


