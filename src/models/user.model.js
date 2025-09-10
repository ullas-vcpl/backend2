const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        trim: true,
        index: true
     },
    email: { 
        type: String,
        required: true,
        unique: true
     },
    fullname: { 
        type: String, 
        required: true,
        trim: true,
        index:true
     },
     avatar:
     {
        type: String,
        required: true,
     },
     coverimage:
     {
        type: String,
     },
     watchhistory:[
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"

     }],
    password:
    {
        type: String,
        required: [true, "password is required"],
    },
    refreshtoken:
    {
        type: String
    }


},{timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    {
        return next();
    }  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {   _id: this._id,
            username: this.username,
            email: this.email,  
            fullname: this.fullname,
        },process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
};

module.exports = mongoose.model("User", userSchema)