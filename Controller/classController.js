const Class = require('../Model/classSchema');
const Child = require('../Model/childSchema');
const Teacher = require('../Model/teacherSchema')

/* All Class Crud Functions */

// Get All Data //
exports.getAllClassData=(req,res,next)=>{
    Class.find()
    .then((data)=>{
        res.json(data);
    }).catch((error)=>{next(error)});
}

// Get Data By ID //
exports.getClassByID=(req,res,next)=>{
    Class.findOne({_id:req.params.id})
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

// Add Class //
exports.addNewClass=(req,res,next)=>{
    const newClass = new Class({
        _id:req.body._id,
        fullname:req.body.fullname,
        supervisor:req.body.supervisor,
        children:req.body.children
    });

    newClass.save().then(()=>{
        res.json({message:"added"});
    }).catch((error)=>{next(error)})
}

// Update Class //
exports.updateClass=(req,res,next)=>{
    Class.findByIdAndUpdate(req.body._id,req.body)
    .then((data)=>{
        if(data)
            res.status(201).json({message:"updated"})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
        })
    .catch((error)=>{next(error)});
}
// Delete Class //
exports.deleteClass=(req,res,next)=>{
    Child.findByIdAndDelete(req.body._id)
    .then((data)=>{
       if(data)
        res.status(201).json({message:"deleted"})
       else{
        let error = new Error("ID Not Found");
        error.statusCode=404;
        throw error;
       }
    })
    .catch((error)=>{next(error)});
}

// Get Class Children //
exports.getAllClassChildren=(req,res,next)=>{

    Class.findOne({_id:req.params.id})
    .then((targetClass)=>{
        if(targetClass){
            const idArray = targetClass.children;
            Child.find().where('_id').in(idArray)
            .then((data)=>{res.status(200).json(data)})
            .catch((error)=>{next(error)});
        }
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch((error)=>{next(error)});
}
// Get Class Teacher //
exports.getClassTeacher=(req,res,next)=>{
    Class.findOne({_id:req.params.id})
    .then(targetClass=>{
        if(targetClass){
           Teacher.findById(targetClass.supervisor)
           .then((data)=>{res.status(200).json(data)})
           .catch((error)=>{next(error)});
        }else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch(error=>{next(error)})
}
