const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultantSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    visitors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Visitor',
      },
    ],
  },
  { timestamps: true }
);

const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
