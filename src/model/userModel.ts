import mongoose from "mongoose";

let Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,

  lastVisited: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("User", userSchema);
