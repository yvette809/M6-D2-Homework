const express = require("express")
const studRoutes = require('./services/students')

const mongoose = require ("mongoose")
const cors = require("cors")

const server = express()
/
    
// }
server.use(cors())
server.use(express.json()) 

server.use("/students",studRoutes)
const port = process.env.PORT || 3000

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


