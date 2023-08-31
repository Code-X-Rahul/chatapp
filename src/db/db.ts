import mongoose from "mongoose";

const connectDb = async (url: string) => {
  return mongoose.connect(url).then(() => console.log("success"));
};

export default connectDb;
