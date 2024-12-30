import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generatetokenandesetcookie from "../utils/generatetoken.js";
export const signup=async (req,res) => {
    try {
        const{fullName,username,password,confirmpassword,gender}=req.body;
        
        if(password!==confirmpassword){
            return res.status(400).json({error:"password don't match"});
        }

        const user=await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exists"});

        }

        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);

        const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName,
            username,
            password:hashpassword,
            gender,
            profilepic:gender==="male"?boyprofilepic:girlprofilepic,
        });

        if(newUser){
            generatetokenandesetcookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilepic:newUser.profilepic
            });

        }else{
            res.status(400).json({error:"invalid user data"});
        }

    } catch (error) {
        console.log("error in signup controller",error.message)
        res.status(500).json({error:"internal server error"});
        
    }
    
};

export const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const ispasswordcorrect =await bcrypt.compare(password,user?.password||"");

        if(!user||!ispasswordcorrect){
            return res.status(400).json({error:"invalid username or password"});

        }
        generatetokenandesetcookie(user._id,res);

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilepic:user.profilepic
        });
        
    } catch (error) {
        console.log("error in signin controller",error.message)
        res.status(500).json({error:"internal server error"});
    }
}

export const logout=(req,res)=>{
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out"});

        
    } catch (error) {
        
        console.log("error in LOGOUT controller",error.message)
        res.status(500).json({error:"internal server error"});
        
    }
}

