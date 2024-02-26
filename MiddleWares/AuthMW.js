const jwt = require("jsonwebtoken");

const Key = process.env.SECRET_KEY;


module.exports=(req,res,next)=>{
    try{
        let token = req.get('authorization').split(" ")[1];
        let decodedToken = jwt.verify(token,Key);
        req.token=decodedToken;
        next();
    }catch(error){
            error.message = "Not Authinticated";
            error.statusCode = 401;
            next(error);
    }
   
}

module.exports.isTeacher=(req,res,next)=>{
    if(req.token.role=="Teacher"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}
module.exports.isAuthTeacher=(req,res,next)=>{
    if(req.token.role=="Teacher" && req.token._id==req.body._id){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}


module.exports.isAdmin=(req,res,next)=>{
    if(req.token.role=="Admin"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}

module.exports.isTeacherOrAdmin=(req,res,next)=>{
    if(req.token.role=="Teacher"||req.token.role=="Admin"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}
module.exports.isAuthTeacherOrAdmin=(req,res,next)=>{
    if((req.token.role=="Teacher" && req.token._id==req.body._id)||req.token.role=="Admin"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}