const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const { isEmail } = require("validator");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Email is not valid"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password should be greater than or equal to 8"]
    },
    wishlist : [{
        type : Schema.Types.ObjectId,
        ref : "Model"
    }]

});

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.statics.login = async function (email,password) {
    if(!email) {
        throw Error("Email is required")
    }

    if(!password) {
        throw Error("Password is required")
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error ("incorrect email")
    }
    const isPasswordEqual = await bcrypt.compare(password , user.password);
    if(!isPasswordEqual) {
        throw Error ("incorrect password")
    }
    return user;
}

module.exports = mongoose.model("User", UserSchema);