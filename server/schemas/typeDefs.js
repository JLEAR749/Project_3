const { gql } = require("apollo-server-express");
//mutations not accurate; just set to get server working
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }

  type Score {
    _id: ID!
   type: Int
  }

  type Query {
    user: [User]
    score(_id: Int): [Score]

    getSingleUser(user: String!): User
   
  }

  type AddUserResponse {
    token: String
    user: User
  }
  
  type Mutation {
    deleteScore(user: String!, tech2: String!): Score
    addUser(username: String!, email: String!, password: String!): AddUserResponse
    saveUser(user: String!): User
    deleteUser(user: String!): User
    login(user: String!): User
    saveScore(user: String!): Score
    
  }
`;

module.exports = typeDefs;
