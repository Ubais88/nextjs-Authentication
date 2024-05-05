import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("DB Connected Successfully")
        })
        connection.on("error",(err)=> {
            console.log('Error Occured in DB Connection',err);
            process.exit()
        })
    }
    catch(error){
        console.log("Erorr: ", error);
    }
}