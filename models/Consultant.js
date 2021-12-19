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
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    visits: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Visit',
      },
    ],
  },
  { timestamps: true }
);

const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
