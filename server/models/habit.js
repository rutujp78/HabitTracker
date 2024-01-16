import mongoose, { Schema } from "mongoose";

const habitSch = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true  
    },
    title: {
        type: String,
        required: true,
    },
    dates: {
        type: [Date],
        defualt: []
    }
});

const Habit = mongoose.model("Habit", habitSch);

export default Habit;