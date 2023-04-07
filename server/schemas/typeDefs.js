const { gql } = require("apollo-server-express");

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
  }

  type Mutation {
    deleteScore(user: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
