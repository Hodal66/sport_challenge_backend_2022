import {gql} from "apollo-server";

const Schema = gql`
type userRegistration{
    id:ID
    first_name:String!
    last_name:String!
    email:String!
    password:String!
    comfirm_password:String!
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
input updateUserInfo{
    first_name:String!
    last_name:String!
    email:String!
}

type Query {
    getAllUserRegistered:[userRegistration]
    getOneRegisteredUser(id:ID!):getOneUser
}

type Mutation{
    createUSerRegistration(input:createUserInfo):userRegistration
    deleteRegisteredUser(email:String!):Boolean
   
}
`


export default Schema