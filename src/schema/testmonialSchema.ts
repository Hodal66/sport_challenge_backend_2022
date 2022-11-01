import {gql} from "apollo-server";
const schema = gql`
type testMonial {
    full_name:String!
    image:String!
    quote:String!
    job:String!
}
`
export default schema;