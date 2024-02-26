const mongoose = require('mongoose');
const { schema } = require('./childSchema');
const bcrypt = require('bcrypt');

let Schema = new mongoose.Schema({
    fullname:String,
    password:String,
    email:{type:String,unique: true,lowercase:true},
    image:String
})

Schema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports=mongoose.model("teachers",Schema);