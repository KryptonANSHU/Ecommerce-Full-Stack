const { maxLength } = require('cookieparser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please Enter Your Name"],
        maxLength:[30,"Cannot Exceed 30 Chrachters"],
        minlength:[2,"Name should have Atleast 2 charachters"]

    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a VAlid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your PAssword"],
        minlength:[4,"Password Should have more than 4 Charachters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
            next();
    }
    
    this.password = await bcrypt.hash(this.password,10)

})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
     })
}

//Compare PAssword
userSchema.methods.comparePassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema)