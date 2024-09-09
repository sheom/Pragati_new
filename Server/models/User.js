import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50, },
    lastName: { type: String, required: true, min: 2, max: 50, },
    email: { type: String, required: true, max: 50, unique: true, },
    email_verified: {type: Boolean, default: false},
    password: { type: String, required: true, min: 5, },
    location: String,
    subsidiary: { type: String, required: true, min: 2, },
    subsidiaryId: { type: String, required: true, min: 2, },
    userRole : { type: Number, default: 0 }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

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