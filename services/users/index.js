const express = require("express");
const UserModel = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {basicAuth,adminOnlyMiddleware} = require ("../middleware/auth")
const q2m = require("query-to-mongo")
const userRouter = express.Router();


// register a user

userRouter.post("/register", async(req,res,next)=>{
    const {firstName, lastName,username, password} = req.body;
    try{
        let user = await UserModel.findOne({username:username})
        if(user){
            const error = new Error("user already exist");
            error.httpStatusCode = 404;
            next(error)
        }else{
            user = new UserModel({
                firstName,
                lastName,
                username,
                password
            })

            // encrypt password before saving user in the database
            const salt  = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
            await user.save();

            // send a payload to the user when registring(jsonwebtoken). It takes 4 parameters
            const payload = {
                user:{
                    id:user.id
                }
            }

            jwt.sign(payload, process.env.jwt_Secret, {expiresIn:360000}, (err,token)=>{
                if(err){
                    throw err
                }else{
                    res.json({token})
                }

            } )
        }


    }catch(error){
        next (error)
    }
    
})

// get users
userRouter.get("/", adminOnlyMiddleware, async(req,res,next)=>{
    try{
        const query = q2m(req.query)
        const users = await UserModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)

        res.send({
            data:users,
            total:users.length
        })

    }catch(error){
        next(error)
    }
})

// user get its data
userRouter.get("/me",basicAuth,async(req,res,next)=>{
    try{
        res.send(req.user)
    }catch(error){
        next("while reading list of users, a problem occured")
    }
})


// user edits it's data

userRouter.put("/me", basicAuth, async(re,res,next)=>{
    try{
        const updates = object.keys(req.body)

    try{
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user);

    }catch(error){
        res.status(400).send(error)
    }
    }catch(error){
        next(error)
    }
   
})

// user deletes itself
userRouter.delete("/me",basicAuth, async(req,res,next)=>{
    try{
        await req.user.remove()
        res.send("deleted")
    }catch(error){
        next(error)
    }
})



module.exports= userRouter;