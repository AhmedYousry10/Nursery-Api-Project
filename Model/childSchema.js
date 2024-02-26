const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AddressSchema = new mongoose.Schema({
    city:String,
    street:String,
    building:String,
},{ _id : false })

let Schema = new mongoose.Schema({
    _id:Number,
    fullname:String,
    age:Number,
    level:{type : String,
          enum: ["PreKG","KG1","KG2"]},
    address:AddressSchema
},{ _id: false }
)

Schema.plugin(AutoIncrement);


module.exports=mongoose.model("children",Schema);