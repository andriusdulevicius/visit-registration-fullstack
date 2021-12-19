const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    consultant: {
      type: Schema.Types.ObjectId,
      ref: 'Consultant',
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
