import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import {generateToken} from '../lib/utils.js'

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

export const login=(req,res)=>{
    res.send("login");
}

export const logout=(req,res)=>{
    res.send("logout");
}