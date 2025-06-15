const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'TG'],
    },
    age: {
      type: Number,
      min: [18, 'age must greater than 18'],
    },
    ageStatus: {
      type: String,
    },
    mobile: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length > 9;
        },
        message: (props) => `${props.value} is not valid mobile number.`,
      },
    },
    address: {
      city: {
        type: String,
      },
      pincode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// Pre Middleware to set ageStatus
profileSchema.pre('save', function (next) {
  this.ageStatus = this.age > 18 ? 'Major' : 'Minor';
  next();
});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;
