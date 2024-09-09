import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    propertyName: { type: String, required: true },
    propertyCode: { type: String, required: true },
    propertyId: { type: String, required: true },
    budgetYear: { type: String, required:true},
    locked: {type: Boolean, default: false },
    payload: { type: Object, required:true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;