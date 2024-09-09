import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    propertyName: { type: String, required: true },
    propertyCode: { type: String, required: true },
    propertyId: { type: String, required: true },
    fye: { type: String, required:true},
    ratingYear: { type: String, required:true},
    ratingMonth: { type: String, required:true},
    ratingQ: { type: String, required:true},
    locked: {type: Boolean, default: true },
    payload: { type: Object, required:true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;