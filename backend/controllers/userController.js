const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModels');


// Register a User

exports.registerUser =catchAsyncErrors(async (req,res)=>{
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicURL"
        }
    })

    const token = user.getJWTToken();
    
    res.status(201).json({
        success:true,
        token,
    })

})


//LOGIN USER
exports.loginUser = catchAsyncErrors(async (req,res)=>{

    const {email,password} = req.body;

    //checking user has given email and password or not

    if(!email || !password){
        return next(new ErrorHandler("Product not Found", 404))
    }

    const user = await User.findOne({email:email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const token = user.getJWTToken();
    
    res.status(201).json({
        success:true,
        token,
    })

})
