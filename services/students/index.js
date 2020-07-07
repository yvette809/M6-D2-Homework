const express = require ("express")
const fs = require("fs")
const path = require("path")
const{join}= require("path")
const uniqid = require("uniqid")
const studRouter = express.Router()
// const {check, validationResult} = require("express validator")
const { response } = require("express")
const multer = require("multer")

const usersFilePath = path.join(__dirname,"students.json")
//1
studRouter.get("/", (req,res)=>{
const fileContent = fs.readFileSync(usersFilePath)
 const studentString = fileContent.toString()
 console.log(studentString)
 res.send(JSON.parse(studentString))
})


//2
studRouter.get("/:id", (req,res) =>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    console.log(studentsArray)
    //we filter out the array to get the specified user
   const student= studentsArray.filter(student => student.id === req.params.id)
   console.log(student)
   res.send(student)


})

//3
studRouter.post("/", (req,res)=>{
    console.log(req.body)
    const newStud = {...req.body, id:uniqid(), numberOfProjects :0}
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    studentsArray.push(newStud)
    // now we write the new content in to the same file
    fs.writeFileSync(usersFilePath, JSON.stringify(studentsArray))
    res.status(201).send(newStud)
})

//4
studRouter.put("/:id", (req,res)=>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray= JSON.parse(fileContent.toString())
    if(studentsArray.length > 0){
        const filteredStudsArray = studentsArray.filter(student =>
            student.id !== req.params.id)
            const student = { id: req.params.id, ...req.body }
            filteredStudsArray.push(student)
            fs.writeFileSync(usersFilePath, JSON.stringify(filteredStudsArray))
            res.send(student)
    }else{
        res.status(404).send("weare sorry we do not have any student yet")
    }
    
})


//5
studRouter.delete("/:id", (req,res)=>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    if(studentsArray.length > 0){
        // filter students by excluding the one with specified id
    const filteredStudsArray = studentsArray.filter(student =>{
        student.id !== req.params.id
        // write the filtered content back in to the same file
    fs.writeFileSync(usersFilePath, JSON.stringify(filteredStudsArray))
    res.send("that student was deleted")
    })

    } else{
        res.status(404).send("student not deleted")
    }
    
})
// const validator = [check("name").exist().isLength({min:3}).withMessage("name is mandatory"), check("profession".exist().isLength({min:3}).withMessage("profession is mandatory"))]

studRouter.post("/:checkEmail", (res,req)=>{
    const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return response.status(400).send(errors)
    // }
    const newStud = {...req.body, id:uniqid(), numberOfProjects :0}
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    const students = studentsArray.filter(student => student.id!==newStudent.id)
    if(students.length > 0){
        const filteredStudents = students.filter(student => student.email === newStudent.email)
        if(filteredStudents.length > 0){
            res.status(400).send(false)
        }else{
            res.status(200).send(true)
        }
    }else{
        res.status(200).send(true)
    }
})
// upload files
const upload = multer({})
studRouter.post("/:id/upload", upload.single("avatar"), (req, res)=>{
    const imagespath =join(__dirname,"../../../images")
    //images/mysummer/2020/imagename.jpg
    console.log(req.file)
    const fileExt = path.extname(req.file.originalname)
    fs.writeFileSync(join(imagespath,req.params.id + fileExt), req.file.buffer)
    //1 save in to the student the path to it's own image
    
    //make the image folder public
    res.send("ok")
})

//   router.get("/:id/projects", (req, res) => {
//     const projects = readFile(path.join(__dirname, "../projects/projects.json"))
  
//     res.send(projects.filter((proj) => proj.studentID === req.params.id))
//   })

module.exports = studRouter