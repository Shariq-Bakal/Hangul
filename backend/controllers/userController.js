const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
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
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in signingup",
            success: false,
            error
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
            user,
            token
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in loggging in user",
            success: false,
            error
        })
    }
}



module.exports = {
    signup,
    login
}