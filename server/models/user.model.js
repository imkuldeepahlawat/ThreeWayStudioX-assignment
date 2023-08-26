const mongoose = require("mongoose");

const userSchemaM = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  userType:{
    type: String,
    required: true,
  },
  orderList:[]
});
const userSchemaP = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  userType:{
    type: String,
    required: true,
  }
});

const UserP = mongoose.model("UsersP", userSchemaP);
const UserM = mongoose.model("UsersM", userSchemaM);
module.exports = { UserP, UserM };
