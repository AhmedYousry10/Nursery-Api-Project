const Child = require('../Model/childSchema');
/* All Child Crud Functions */

// Get All Data //
exports.getAllChildrensData=(req,res,next)=>{
    Child.find()
    .then((data)=>{
        res.json(data);
    }).catch((error)=>{next(error)});
}

// Get Data By ID //
exports.getChildByID=(req,res,next)=>{
    Child.findOne({_id:req.params.id})
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

// Add Child //
exports.addNewChild=(req,res,next)=>{
    const child = new Child({
        _id:req.body._id,
        fullname:req.body.fullname,
        age:req.body.age,
        level:req.body.level,
        address:req.body.address
    });

    child.save().then(()=>{
        res.json({message:"added"});
    }).catch((error)=>{next(error)});
}

// Update Child //
exports.updateChild=(req,res,next)=>{
    Child.findByIdAndUpdate(req.body._id,req.body)
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
// Delete Child //
exports.deleteChild=(req,res,next)=>{
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