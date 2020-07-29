const express = require("express")
const studRouter = require('./services/students')
const projectRouter = require("./services/projects")
const mongoose = require ("mongoose")
const cors = require("cors")

const server = express()

    

server.use(cors())
server.use(express.json()) 

server.use("/students",studRouter)
server.use("/projects", projectRouter)
const port = process.env.PORT || 3040

mongoose.connect("mongodb://localhost:27017/students-profile",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(
    server.listen(port, () =>{
        console.log(`something is runnning on port ${port}`)
    })
)
.catch(error => console.log(error)

)



