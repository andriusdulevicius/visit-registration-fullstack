const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema(
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

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
