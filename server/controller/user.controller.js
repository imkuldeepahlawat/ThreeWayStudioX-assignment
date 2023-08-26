const { UserP, UserM } = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password, userType } = req.body;
    let user;
    console.log(req.body)
    if (userType === "manufacturer") {
      
      user = await UserM.findOne({ username });
    } else if (userType === "transporter") {
      user = await UserP.findOne({ username });
    }
    if (!user) return res.json({ msg: "Incorrect Username ", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.registerP = async (req, res, next) => {
  try {
    const { username, name, password,userType } = req.body;
    const usernameCheck = await UserP.findOne({ username });
    const usernameCheck2 = await UserM.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    if (usernameCheck2)
      return res.json({ msg: "Username already  a manufacturer", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      userType: userType,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.registerM = async (req, res, next) => {

  try {
    const { username, name, password, userType } = req.body;
    const usernameCheck = await UserM.findOne({ username });
    const usernameCheck2 = await UserP.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    if (usernameCheck2)
      return res.json({ msg: "Username already transporter", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserM.create({
      name,
      username,
      password: hashedPassword,
      userType: userType,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.id },
    }).select(["email", "username", "avatarImage", "_id"]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
