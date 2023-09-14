const User = require("../models/userModel");

//Sign up function

const Signup = async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.create({ email, password });
        res.status(201).json({
            message: "Sign up is Successful",
            success: true,
            user
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



module.exports = {
    Signup,
}