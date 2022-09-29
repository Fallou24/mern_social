const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:false
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)