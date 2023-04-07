const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { saveScore } = require("../controllers/user-controller");
const { Tech, Matchup } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-_v -password"
        );

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveScore: async (parent, { scoreData }, context) => {
      if (context.user) {
        const updateScore = await User.findByIdAndUpdate(
          { _id: context.user_id },
          { $push: { updateScore: scoreData } },
          { new: true }
        );
        return updateScore;
      }
      deleteScore: async (parent, { scoreData }, context) => {
        if (context.user) {
          const deleteScore = await User.findByIdAndUpdate(
            { _id: context.user_id },
            { $push: { deleteScore: scoreData } },
            { new: true }
          );
          return deleteScore;
        }
        createScore: async (parent, { scoreData }, context) => {
          if (context.user) {
            const createScore = await User.findByIdAndUpdate(
              { _id: context.user_id },
              { $push: { createScore: scoreData } },
              { new: true }
            );
            return createScore;
          }
        };
      };
    },
  },
};

module.exports = resolvers;
