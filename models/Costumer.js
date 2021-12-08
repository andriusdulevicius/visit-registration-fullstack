const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costumerSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Costumer = mongoose.model('Costumer', costumerSchema);

module.exports = Costumer;
