const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  name: {
    type: Int,
    required: true,
    unique: true,
  },
});

const Tech = model('Score', scoreSchema);

module.exports = Score;
