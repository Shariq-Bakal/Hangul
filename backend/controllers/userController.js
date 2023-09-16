const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}

const handleErrors = (error) => {
    console.log(error.message , error.code);
    let errors = {email : '' , password : ''};

    if(error.message === "incorrect email") {
        errors.email = "Email is not registered"
    }

    if(error.message === "incorrect password") {
        errors.email = " Incorrect Password"
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
    const { email, password } = req.body;
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
    const {email , password} = req.body;
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

module.exports = {
    signup,
    login
}