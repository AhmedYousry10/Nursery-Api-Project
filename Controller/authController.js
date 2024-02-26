const jwt = require('jsonwebtoken');
const Teacher = require('../Model/teacherSchema');
const bcrypt = require("bcrypt");

const Key = process.env.SECRET_KEY;

// exports.login=(req,res,next)=>{
//     Teacher.findOne({email:req.body.email,password:req.body.password})
//     .then((data)=>{
//         if(data){
//             let token = jwt.sign({id:data._id,role:"Teacher"},Key);
//             res.status(200).json(token);
//         }else{
//             let error = new Error("Incorrect Email or Password");
//             error.statusCode=401;
//             throw error;
//         }
//     })
//     .catch((error)=>{next(error)});
// }

exports.hashedLogin=(req,res,next)=>{
    let password = req.body.password;
    let email = req.body.email;
    Teacher.findOne({email:req.body.email})
    .then((teacher)=>{
        if(teacher){
            bcrypt.compare(password,teacher.password)
            .then((auth)=>{
                if(auth){
                    if(email=="admin@test.com"&&password=="Admin12345_"){
                        let token = jwt.sign({id:teacher._id,role:"Admin"},Key);
                        res.status(200).json(token);
                    }else{
                        let token = jwt.sign({id:teacher._id,role:"Teacher"},Key);
                        res.status(200).json(token);
                    }
                    
                }else{
                    let error = new Error("Incorrect Password");
                    error.statusCode=401;
                    throw error;
                }   
            }).catch((error)=>{next(error)})
        }else{
            let error = new Error("Incorrect Email");
            error.statusCode=401;
            throw error;
        }
    }).catch((error)=>{next(error)});

}