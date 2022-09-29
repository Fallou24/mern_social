const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50,
        default:""
    },
    city: {
        type: String,
        max: 50,
        default:""
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
        default:""
    },
    from:{
        type:String,
        default:""
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema)