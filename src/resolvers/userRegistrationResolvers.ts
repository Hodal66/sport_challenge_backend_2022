import { userRegistration } from "../module/userRegistration";

const userRegistrationResolvers: any = {
  Query: {
    async getAllUserRegistered() {
      const allUser = await userRegistration.find();
      return allUser;
    },
    async getOneRegisteredUser(parent:any, args:any){
        const userId = args.id;
        if(!userId) throw new Error("Please there is no Id provided!!");
        const getUser = await userRegistration.findById(userId);
        return getUser;
    }
  },
  Mutation: {
    async createUSerRegistration(parent: any, args: any) {

        const email_test = args.input.email;

    //check if provided user Email is valid

      const checkEmailValidation = (email:any)=>{
        return String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      }
      if(checkEmailValidation(email_test) == null) throw new Error(`The provided Email =>${email_test} is not valid and can't be empty`)
    

        //check if user is alread exist in the database

      const checkIfUserExists = await userRegistration.findOne({
       email:email_test
      });
      if (checkIfUserExists) {
        throw new Error("Sorry User Already Exist in db");
      };

     // check if password is matched

      if (args.input.password !== args.input.comfirm_password)
        throw new Error("Password do not match!! please verify password!");
      const createNewUser = await userRegistration.create({
        first_name: args.input.first_name,
        last_name: args.input.last_name,
        email: args.input.email,
        password: args.input.password,
        comfirm_password: args.input.comfirm_password,
      });
      return createNewUser;
    },
   
    async deleteRegisteredUser(parent:any, args:any, context:any){
     const  deleteUserEmail = args.email

     console.log(deleteUserEmail);

     if(!deleteUserEmail) throw new Error("Please Provide an Email");

     const checkUserEmail = await userRegistration.findOne({email:deleteUserEmail});
     if(!checkUserEmail) throw new Error("Your Email is not correct");

     const deletedUser = await userRegistration.deleteOne({email:deleteUserEmail});
     if(!deletedUser) throw new Error ("User not deleted")
     return true;

    }
  },
};

export default userRegistrationResolvers;
