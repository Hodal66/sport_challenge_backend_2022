import { ApolloServer,gql } from "apollo-server";
import { connect } from "./db/database.config";
import resolvers from "./resolvers/userRegistrationResolvers"
import typeDefs from "./schema/userRegistrationSchema"


const port = process.env.PORT || 5500;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

connect().then(() => {
    console.log("Database connected!");
    server.listen(port).then(({ url }) => console.info(`App on ${url}`));
  });
