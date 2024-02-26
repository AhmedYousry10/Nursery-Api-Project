const Teacher = require('../Model/teacherSchema');
const bcrypt = require('bcrypt');
/* All Teacher Crud Functions */

// Get All Data //
exports.getAllTeachersData=(req,res,next)=>{
    Teacher.find({})
    .then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{next(error)});
}

// Get Teacher By ID //
exports.getTeacherByID=(req,res,next)=>{
    Teacher.findOne({_id:req.params.id})
    .then((data)=>{
        if(data)
            res.json(data);
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch((error)=>{next(error)});
}
// Add Teacher //
exports.addNewTeacher=(req,res,next)=>{

    const teacher = new Teacher({
        fullname:req.body.fullname,
        password:req.body.password,
        email:req.body.email,
        image:req.file.path
    });

    teacher.save().then(()=>{
        res.json({message:"added"});
    }).catch((error)=>{next(error)});
   
}

// Update Teacher //
exports.updateTeacher=(req,res,next)=>{
    const updatedData = {
        fullname:req.body.fullname,
        password:req.body.password,
        email:req.body.email,
        image:req.file.path
    };
    Teacher.findByIdAndUpdate(req.body._id,updatedData)
    .then((data)=>{
        if(data)
            res.status(201).json({message:"updated"})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404
            throw error;
        }
        })
    .catch((error)=>{next(error)});
}
// Delete Teacher //
exports.deleteTeacher=(req,res,next)=>{
    Teacher.findByIdAndDelete(req.body._id)
    .then((data)=>{
       if(data)
        res.status(201).json({message:"deleted"})
       else{
        let error = new Error("ID Not Found");
        error.statusCode=404
        throw error;
       }
    })
    .catch((error)=>{next(error)});
}
// Get Supervisors //
exports.getSupers=(req,res,next)=>{
    res.json({data:[{},{},{}]});
}
// Change Password //
exports.changePassword=async (req,res,next)=>{

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password=hashedPassword;

    Teacher.findByIdAndUpdate(req.body._id,req.body)
    .then((data)=>{
        if(data)
            res.status(201).json({message:"Password changed"})
        else{
            let error = new Error("User Not Found");
            error.statusCode=401;
            throw error;
        }
        })
    .catch((error)=>{next(error)});
}