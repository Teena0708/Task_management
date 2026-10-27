const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title : {
        type:String,
        required :true,
        trim:true
    },
    user:{
        type : mongoose.Schema.type.Object_id,
        ref:"user"
    }
})

module.exports = mongoose.model("task",taskSchema);