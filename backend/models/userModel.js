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
    }

});

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

})

module.exports = mongoose.model("User", UserSchema);