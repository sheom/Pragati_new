import mongoose from "mongoose";

const actualSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    propertyName: { type: String, required: true },
    propertyCode: { type: String, required: true },
    propertyId: { type: String, required: true },
    fye: { type: String, required:true},
    actualYear: { type: String, required:true},
    actualMonth: { type: String, required:true},
    locked: {type: Boolean, default: true },
    payload: { type: Object, required:true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
  { timestamps: true }
);

const Actual = mongoose.model("Actual", actualSchema);

export default Actual;