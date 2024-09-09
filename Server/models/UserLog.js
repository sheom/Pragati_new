import mongoose from "mongoose";

const UserLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true, max: 50 },
    loginIP: { type: String, required: true }
  },
  { timestamps: true }
);

const UserLog = mongoose.model("UserLog", UserLogSchema);
export default UserLog;

/////////////////////////////////////////////////////////////
    // viewedProfile: Number,
    // impressions: Number,
    // picturePath: {
    //   type: String,
    //   default: "",
    // },
    // friends: {
    //   type: Array,
    //   default: [],
    // },