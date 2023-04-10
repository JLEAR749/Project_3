const express = require("express");

module.exports = {
    
    async createUser ({ body }, res) {
        const user = await User.create(body);
        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
          }
          const token = signToken(user);
          res.json({ token, user });
    },

    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
          return res.status(400).json({ message: "Can't find this user" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);

    },

      async deleteScore({ user, params }, res) {
        const updateScore = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedScores: { scoreId: params.scoreId } } },
          { new: true }
        );
       
        return res.json(updateScore);
      },

      async saveUser ({ body }, res) {
        const user = await User.findOneAndUpdate(body); //double check findOneAndUpdate
        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
          }
          const token = signToken(user);
          res.json({ token, user });
      },

      async deleteUser({ user, params }, res) {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedUser: { userId: params.userId } } },
          { new: true }
        );
       
        return res.json(updateUser);
      },

      async getSingleUser({ body }, res) {
        const user = await User.findOne(
          { _id: user._id },
        );
        
        const token = signToken(user);
        return res.json(token, user);
      },

    };

