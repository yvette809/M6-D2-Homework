const ReviewsModel = require('./schema')
const express = require ("express")

const reviewsRouter = express.Router()

// get all reviews

reviewsRouter.get("/", async(req,res,next)=>{
    try{
        const reviews = await ReviewsModel.find(req.query)
    res.status(200).send(reviews)
    }catch(error){
        next(error)
    }
    
})

// get a single review
reviewsRouter.get("/:id", async(req,res,next)=>{
    try{
        const review = await ReviewsModel.findById(req.params.id)
        if(review){
            res.status(200).send(review)
        }else{
            const error = new Error()
            error.httpStatusCode = 404
            next(error)

        }
    }catch(error){
        next(error)
    }
    
})

// create a review
reviewsRouter.post("/", async(req,res,next)=>{
    try{
    const newReview = new ReviewsModel(req.body)
    const response = await newReview.save()
    res.status(201).send(response)
    }catch(error){
        next(error)
    }
    
})

// update review
reviewsRouter.put("/:id", async(req,res,next)=>{
    try{
        const review = await ReviewsModel.findById(req.params.id)
        if(review){
            res.status(200).send(review)
        }else{
            const error = new Error(`review with id ${req.params.id} not found`)
            error.httpStatusCode=404
            next(error)
        }

    }catch(error){
        next(error)
    }
})

// delete a review
 reviewsRouter.delete("/:id", async(req,res,next)=>{
     try{
         const review = await ReviewsModel.findByIdAndDelete(req.params.id)
         if(review){
             res.status(200).send(review)
         }else{
             const error = new Error()
             error.httpStatusCode = 404
             next(error)
         }

     }catch(error){
         next(error)
     }
 })
  




module.exports = reviewsRouter