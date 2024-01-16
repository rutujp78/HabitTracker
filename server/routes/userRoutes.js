import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({username});

        if(user) return res.status(500).json({message: "User already exsists"});

        const hashedPass = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPass
        });

        res.status(201).json(newUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while storing user"});
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check if user exist or not
        const user = await User.findOne({email: email});
        if(!user) {
            // console.log("first")
            return res.status(404).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.status(400).json({message: "Invalid User"});
        }

        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);
        
        delete user.password;
        res.status(200).json({token, user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while login"});
    }
});

export default router;