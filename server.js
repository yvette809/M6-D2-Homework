const express = require("express")
const studRouter = require('./services/students')
const projectRouter = require("./services/projects")
const reviewsRouter = require("./services/reviews")
const userRouter = require("./services/users")
const authRouter= require ("./services/login/authRouter")
const mongoose = require ("mongoose")
const dotenv = require ("dotenv")

dotenv.config()
const cors = require("cors")

const server = express()

    

server.use(cors())
server.use(express.json()) 

server.use("/students",studRouter)
server.use("/projects", projectRouter)
server.use("/reviews", reviewsRouter)
server.use("/users", userRouter)
server.use("/login", authRouter)
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



