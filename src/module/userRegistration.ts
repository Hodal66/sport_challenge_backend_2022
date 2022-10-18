import mongoose,{Schema} from "mongoose";
const userRegistration = mongoose.model(
    "RegisterUser",
    new Schema({
        first_name:{
            type:String,
            min:3,
            max:255,
        },
        last_name:{
            type:String,
            min:3,
            max:255,
        },
        
        email:{
            type:String,
            unique:true,
            max:255,
        },

        password:{
            type:String,
            min:3,
            max:20,
        },

        comfirm_password:{
            type:String,
            min:3,
            max:20

        }
    })
)
export {userRegistration} 