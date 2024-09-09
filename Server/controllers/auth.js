import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserLog from "../models/UserLog.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      subsidiary,
      subsidiaryId,
    } = req.body;
    console.log(
      "Submitted Data: ",
      firstName,
      lastName,
      email,
      password,
      location,
      subsidiary,
      subsidiaryId
    );

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      location,
      subsidiary,
      subsidiaryId,
      userRole: 0,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
//app.enable('trust proxy')
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //const ip = req.ip;
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    //const ip= "127.0.0.1"
    console.log("Users IP is: "+ ip);
    //
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    //
    //UserLog
    /*
    userId: { type: String, required: true },
    email: { type: String, required: true, max: 50, unique: true, },
    location: String,
    loginIP: { type: String, required: true }
    */
    //
    const newUserLog = new UserLog({
      userId: user._id,
      email: user.email,
      loginIP: ip
    });
    //await 
    newUserLog.save();
    console.log("newUserLog ")
    console.log(newUserLog )
    console.log("savedUserLog")
    //console.log(savedUserLog)
    //
    const token = jwt.sign(
      {
        id: user._id,
        role: user.userRole,
        subsidiary: user.subsidiary,
        subsidiaryId: user.subsidiaryId,
      },
      process.env.JWT_SECRET
    );
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Change Password */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = req.user;
    //
    // console.log("Hello From Auth JS");
    // console.log(user, user.id, oldPassword, newPassword, confirmNewPassword);
    // console.log("Hello From Auth JS");
    //
    let userId = user.id;
    //
    const mappedUser = await User.findOne({ _id: user.id });
    //console.log("mappedUser: " + mappedUser);
    if (!mappedUser)
      return res.status(400).json({ msg: "User does not exist. " });
    const isMatch = await bcrypt.compare(oldPassword, mappedUser.password);
    //console.log("isMatch: " + isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    //
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    //
    const filter = { _id: user.id };
    const update = {
      password: passwordHash, //passwordHash
    };
    //
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      // If `new` isn't true, `findOneAndUpdate()` will return the
      // document as it was _before_ it was updated.
      new: true,
    });
    res.status(200).json({ msg: "Password updated." }); //.json(updatedUser);
    //
    //
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
