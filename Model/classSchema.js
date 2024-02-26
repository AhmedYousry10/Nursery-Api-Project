const mongoose = require('mongoose');



let Schema = new mongoose.Schema({
    _id:Number,
    fullname:String,
    supervisor:{type:mongoose.Types.ObjectId,ref:'teachers'},
    children:[{type:Number,ref:"children"}]
},
)


module.exports=mongoose.model("classe",Schema);