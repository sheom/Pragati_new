import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    
    userId: {type:String, required:true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { unique : true, type: String, required: true },
    type: { type: String, required: true },
    subsidiary: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{ timestamps: true }
);
const Property = mongoose.model("Property", PropertySchema);
export default Property;