import express from "express";
import User from '../models/user.js';
import Habit from '../models/habit.js'
// import mongoose from "mongoose";

const router = express.Router();

router.post('/createhabit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        console.log(user);
        if(!user) return res.status(400).json({message: "User does not exist"});

        const { title } = req.body;

        const habit = await Habit.create({
            userId: user._id,
            title: title,
        })

        res.status(200).json({message: "Habbit saved successflly", habit});
        
    } catch (error) {
        res.status(500).json({message: "Error while saving habit"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find user
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const data = await Habit.find({userId: id});

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while getting user"});
    }
});

router.put('/:habitid', async (req, res) => {
    try {
        const { habitid } = req.params;

        // Check if user exsist or not
        const habit = await Habit.findById(habitid);
        if(!habit) return res.status(400).json("Habit Does Not Exists");
        
        // In case if dates array in not present in database of new user
        if(!habit.dates) {
            habit.dates = [];
        }
        
        const latestDate = new Date(habit.dates[habit.dates.length - 1]);
        const date = new Date();

        // Logic for not storing same date more than once
        if(latestDate.getDate() !== date.getDate() && latestDate.getMonth() !== date.getMonth() && latestDate.getFullYear() !== date.getFullYear()) {
            habit.dates.push(date);
            await habit.save();
            res.status(200).json({message: "Date saved successfully"});
        }
        else {
            res.status(500).json({message: "Date already exsists"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
    
});

router.get('/streak/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find user
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const habit = await Habit.find({userId: id});

        console.log(habit)

        const dates = habit[0].dates;

        if(dates.length === 0) {
            res.status(200).json({streak: 0});
        }

        let streak = 0;
        let currentStreak = 0;

        dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        for(let i=0;i<dates.length;i++) {
            const currentDate = new Date(dates[i]);
            const currentUTC = Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate()
            );

            if(
                i > 0 && 
                currentUTC === 
                Date.UTC(
                    new Date(dates[i - 1]).getUTCFullYear(),
                    new Date(dates[i - 1]).getUTCMonth(),
                    new Date(dates[i - 1]).getUTCDate()
                ) + 24 * 60 * 60 * 1000
            ) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }

            if(currentStreak > streak) {
                streak = currentStreak;
            }
        }

        res.status(200).json({streak});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while getting user"});
    }
});

export default router;