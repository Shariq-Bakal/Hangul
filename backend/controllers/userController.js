const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}

const handleErrors = (error) => {
    let errors = {email : '' , password : ''};

    if(error.message === "Email is required") {
        errors.email = "Email is required"
    }

    if(error.message === "Password is required") {
        errors.password = "Password is required"
    }

    if(error.message === "incorrect email") {
        errors.email = "Email is not registered"
    }

    if(error.message === "incorrect password") {
        errors.password = " Incorrect Password"
    }

    if(error.code === 11000) {
        errors.email = "Email already registered!"
        return errors
    }

    if(error.message.includes("User validation failed")) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

//Sign up function

const signup = async(req, res) => {
    const { email, password } = req.body.userInfo;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id)
        res.cookie("jwt" , token , {maxAge : maxAge * 1000})
        res.status(201).json({
            message: "Sign up is Successful",
            success: true,
            user :  {id : user._id, email : user.email},
            token
        })
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({
            message: "Problem in signing up",
            success: false,
            errors
        })
    }
}

//Login function

const login = async (req,res) => {
    const {email , password} = req.body.userInfo;
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie("jwt" , token , {maxAge : maxAge * 1000})
        res.status(200).json({
            message: "Login is Successful",
            success: true,
            user :  {id : user._id, email : user.email},
            token
        })
    }
    catch(error) {
        const errors = handleErrors(error);
        res.status(500).json({
            message: "Problem in loggging in user",
            success: false,
            errors
        })
    }
}

const logout = (req,res) => {
    res.cookie("jwt" , "")
    res.status(200).json({
        success : true,
        message: "Logout succcessfull",
        token : ""
    })
}

module.exports = {
    signup,
    login,
    logout
}