import { userRegistration } from "../module/userRegistration";
import * as bcrypt from "bcrypt";
import * as jw from "jsonwebtoken";
import dotenv from "dotenv";

interface AuthTokenPayload {
  userId: String;
  first_name: String;
  last_name: String;
  email: String;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", ""); // 3
  if (!token) {
    throw new Error("No token found");
  }

  const decodedData = jw.verify(token, "MHT");
  return decodedData as AuthTokenPayload; // 4
}



const userRegistrationResolvers: any = {
  Query: {
    async getAllUserRegistered() {
      const allUser = await userRegistration.find();
      return allUser;
    },
    async getOneRegisteredUser(parent: any, args: any) {
      const userId = args.id;
      if (!userId) throw new Error("Please there is no Id provided!!");
      const getUser = await userRegistration.findById(userId);
      return getUser;
    },
  },
  Mutation: {
    async createUSerRegistration(parent: any, args: any) {
      const email_test = args.input.email;

      const { input } = args;

      const { first_name, last_name, email, password, comfirm_password } =
        input;

      //check if provided user Email is valid

      const checkEmailValidation = (email: any) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      if (checkEmailValidation(email_test) == null)
        throw new Error(
          `The provided Email =>${email_test} is not valid and can't be empty`
        );

      //check if user is alread exist in the database

      const checkIfUserExists = await userRegistration.findOne({
        email,
      });
      if (checkIfUserExists) {
        throw new Error("Sorry User Already Exist in db");
      }

      // check if password is matched

      const hasPassword = await bcrypt.hash(password, 10);
      const hasPasswordComfirmPassword = await bcrypt.hash(
        comfirm_password,
        10
      );

      if (args.input.password !== args.input.comfirm_password)
        throw new Error("Password do not match!! please verify password!");
      const createNewUser = await userRegistration.create({
        first_name,
        last_name,
        email,
        password:hasPassword,
        comfirm_password: hasPasswordComfirmPassword,
      });
     
      return createNewUser;
    },

    async deleteRegisteredUser(parent: any, args: any, context: any) {
      const deleteUserByEmail = args.email;

      if (!deleteUserByEmail) throw new Error("Please Provide an Email");

      const checkUserEmail = await userRegistration.findOne({
        email: deleteUserByEmail,
      });
      if (!checkUserEmail) throw new Error("Your Email is not correct");

      const deletedUser = await userRegistration.deleteOne({
        email: deleteUserByEmail,
      });
      if (!deletedUser) throw new Error("User not deleted");
      return true;
    },

    async updateRegisteredUser(_parent: any, _args: any) {
      const updateUserById = await userRegistration.findByIdAndUpdate(
        _args.id,
        {
          first_name: _args.inputabc.first_name,
          last_name: _args.inputabc.last_name,
          email: _args.inputabc.email,
        },
        {
          new: true,
        }
      );
      return updateUserById;
    },

    //logon user mutation

    async login_user(parent: any, args: any, context: any) {
      const { email, password } = args;
      const existingUser = await userRegistration.findOne({ email }).exec();
      console.log(existingUser);

      if (!existingUser) {
        throw new Error("User DOES NOT exists");
      }
      const passwordInDb:any = existingUser.password;
      const Valid:any = await bcrypt.compare(password, passwordInDb);
      if (!Valid) {
        throw new Error("Invalid email or password!");
      }
      const token = jw.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
        },
       "myConfig"
      );
      return {
        user: existingUser,
        token,
      };
    }
    },
  };

export default userRegistrationResolvers;
