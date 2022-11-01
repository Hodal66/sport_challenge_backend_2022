import {gql} from "apollo-server";

const Schema = gql`
type userRegistration{
    id:ID
    first_name:String
    last_name:String
    email:String
    password:String
    comfirm_password:String
}
type getOneUser{
    first_name:String!
    last_name:String!
    email:String!
}
input createUserInfo{
    first_name:String!
    last_name:String!
    email:String!
    password:String!
    comfirm_password:String!
}
type getUpdatedUserInfo{
    first_name:String!
    last_name:String!
    email:String!
    _id:String!
}

input inputUpdateUserInfo{
    first_name:String!
    last_name:String!
    email:String!
}
type logedInUserReturn{
    email:String!
    password:String!
}

#  Start Login-------------------------------------

input UserSignUpInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
  }
  type UserDataPayload {
    token: String!
    user: UserCreated!
  }
  type UserCreated {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    _id: ID!
  }
  # End Login-------------------------------------


type Query {
    getAllUserRegistered:[userRegistration]
    getOneRegisteredUser(id:ID!):getOneUser
}

type Mutation{

    createUSerRegistration(input:createUserInfo):userRegistration
    deleteRegisteredUser(email:String!):Boolean
    updateRegisteredUser(id:ID,inputabc:inputUpdateUserInfo):getUpdatedUserInfo
    login_user(email: String!, password: String!): UserDataPayload!
}
`


export default Schema