const { gql } = require("apollo-server-express");
//mutations not accurate; just set to get server working
const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
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
  
  type Mutation {
    deleteScore(user: String!, tech2: String!): Score
    addUser(user: String!): User
    saveUser(user: String!): User
    deleteUser(user: String!): User
    login(user: String!): User
    saveScore(user: String!): Score
    
  }
`;

module.exports = typeDefs;
