const User=require('../model/user')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET_KEY='Secret Key';


const signup=async(req,res,next)=>{
    const{name,email,password}=req.body;
    let existingUser;

    try{
        existingUser=await User.findOne({email:email})
    }catch(err){
        console.log(err)
    }

    if(existingUser){
        return res.status(400).json({message:"user already exist"})
    }

    const hashPassword=bcrypt.hashSync(password);


    const user=new User({
        name:name,
        email:email,
        password:hashPassword
    })

    try{
        await user.save();
    }catch(err){
        console.log(err)
    }

    return res.status(201).json({message:user})
}


const login= async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;

    try{
        existingUser=await User.findOne({email:email})
    }catch(err){
        return new Error(err)
    }

    if(!existingUser){
        return res.status(400).json({message:"user not found"})
    }

    const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Email/Password"})
    }

    const token=jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{
        expiresIn:'24hr'
    })
    console.log(token)

    res.cookie(String(existingUser._id),token,{
        path:'/',
        expires:new Date(Date.now()+1000*30),
        httpOnly:true,
        sameSite:'lax'
    })
    

    return res.status(200).json({message:"successfully login in",user:existingUser,token})
}

const verifyToken=(req,res,next)=>{
    const cookies=req.headers.cookie;
    console.log(cookies)
    const token=cookies.split("=")[1];
    console.log(token)
   
    if(!token){
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:"Invalid Token"})
        }
        console.log(user)
        req.id=user.id;
        next()
    })
}

const getUser=async(req,res,next)=>{
    const userId=req.id;
    let user;
    try{
        user=await User.findById(userId,"-password")
    }catch(err){
        return new Error(err)
    }

    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})
}

exports.signup=signup;
exports.login=login;
exports.verifyToken=verifyToken;
exports.getUser=getUser;