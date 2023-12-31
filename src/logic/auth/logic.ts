import User from "../../models/user";
const bcrypt = require("bcryptjs");
require("dotenv").config();
import { getToken } from "../../utils/token";

export const getUserByUsername = async (username) => {
  console.log("inside authService");
  return await User.findOne({ username });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const getUserByIdAndDelete = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const registerUser = async ({ username, password }) => {
  //generate salt, it can take a while so we use await
  const salt = await bcrypt.genSalt(10);
  //hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  //2 hours to expire in seconds
  const maxAge = 2 * 60 * 60;
  //get token from our utils folder
  const token = getToken(username, maxAge);
  console.log({ token });
  //create new user using mongoose schema from models
  const newUser = await User.create({
    username: username,
    password: hashedPassword,
    token: token,
  });

  console.log("making USER after token b4 cookie----");
  console.log({ newUser });
  //return all the elements we are going to use
  return { newUser, token, maxAge };
};

export const loginUser = async ({ username, password }) => {
  //get the user
  const user = await User.findOne({ username });
  //validate the hashed password we have in our database
  const validPassword = await bcrypt.compare(password, user.password);
  //2 hours to expire in seconds
  const maxAge = 2 * 60 * 60;
  //set up the jwt token
  const token = getToken(username, maxAge);

  //add token to the user
  user.token = token;
  //remember to save your modification
  //https://masteringjs.io/tutorials/mongoose/update
  await user.save();

  console.log({ token });

  return { user, validPassword, token, maxAge };
};

export const updateUser = async (id) => {
  //get the user
  const userToUpdate = await User.findById(id);
  //check if the user is already an admin
  if (userToUpdate.role === "Admin") {
    throw new Error("The user is already an admin");
  }
  userToUpdate.role = "Admin";
  userToUpdate.save();

  return userToUpdate;
};
