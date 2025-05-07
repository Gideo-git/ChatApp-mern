import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import {generateToken} from '../lib/utils.js'
import { json } from 'express';

export const signup=async(req,res)=>{
    const {name,email,password,gender,age}=req.body;
    if(!name || !email || !password || !gender || !age){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const user=await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            age,
            gender
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    age: newUser.age,
                    gender: newUser.gender
                }
            })
            

        }

        else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        console.log("signup controller error",error.message);
        res.status(400).json({message:"Internal server error"});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password); // user.password is already hashed
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id,res)
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender
            }
        });
    } catch (error) {
        console.log("login controller error",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("logout controller error",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile=async(req,res)=>{
    
}

export const checkAuth=(req,res)=>{
    //console.log("checkAuth route hit");

    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller");
        res.status(500).json({message:"Internal Server Error"});    
    }
}