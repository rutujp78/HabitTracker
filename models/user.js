import mongoose, { Schema } from "mongoose";

const userSch = new Schema({
    username: {
        type: String,
        rquired: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model("User", userSch);
export default User;