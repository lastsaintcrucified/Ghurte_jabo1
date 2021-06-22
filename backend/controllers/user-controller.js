const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.schema");
const { validationResult } = require("express-validator");
const httpError = require("../models/http-error");

// const DUMMY_USER = [
//   {
//     id: "u1",
//     name: "Mark Rufflao",
//     image:
//       "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
//     places: 3,
//   },
//   {
//     id: "u2",
//     name: "Mark Rufflao",
//     image:
//       "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
//     places: 3,
//   },
//   {
//     id: "u3",
//     name: "Mark Rufflao",
//     image:
//       "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
//     places: 3,
//   },
//   {
//     id: "u4",
//     name: "Mark Rufflao",
//     image:
//       "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
//     places: 3,
//   },
// ];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new httpError("User Fetching failed", 500);
    return next(error);
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new httpError("Invalid data passed,please check the inputs", 422)
    );
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Signing Up failed ,please try again later",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new httpError("User already exist!", 422);
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    places: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new httpError("Signing Up failed!", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid data passed,please check the inputs", 422);
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Signing Up failed ,please try again later",
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      new httpError(
        "Couldn't identify user, credintials seems to be wrong",
        401
      )
    );
  }
  res.json({ message: "Logged In!!" });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
