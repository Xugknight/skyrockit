const { application } = require("express");
const mongoose = require("mongoose");
// shortcut variable
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted']
  },

});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema]
}, {
  // Mongoose will maintain a createdAt & updatedAt property
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
