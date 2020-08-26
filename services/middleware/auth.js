const jwt = require ("jsonwebtoken");

const basicAuth = (req,res,next)=>{
    const token =  req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg:"No token, authorisation denied"})
    }else{
        // if there is a token, let' verify it
        try{
            const decoded = jwt.verify(token, process.env.jwt_Secret);
            // from the decoded object, i take the user 
            req.user = decoded.user;
            next()
        }catch(err){
            res.status(401).json({msg:"Token is not valid"})
        }
       
    }
}


const adminOnlyMiddleware = async (req, res, next) => {
    if (req.user && req.user.role === "admin") next()
    else {
      const err = new Error("Only for admins!")
      err.httpStatusCode = 403
      next(err)
    }
  }

  module.exports = {
      basicAuth,
      adminOnlyMiddleware
  }