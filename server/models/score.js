const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  name: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Score = model('Score', scoreSchema);

module.exports = Score;
