import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest , NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

connect();


export async function POST(request:NextRequest){
    try{
        const reqBody = request.json();
        const {userName , email , password} = reqBody;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error:"User Already Registered"}, {status:400})
        }
        
        const hashedPassword = await bcrypt.hash(password , 10);
        const newuser = new User({
            userName , email , 
            password:hashedPassword
        })
        const savedUser = await newuser.save();
        console.log("saved User" , savedUser)

        // send Verification Email
        

    }
    catch(error:any){
        console.log(error)
        return NextResponse.json({error: error.message}, {status:})
    }
}