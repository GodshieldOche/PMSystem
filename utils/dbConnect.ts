import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.MONGODB_URI!).then((con) => {
    console.log("conncted to database");
  });
};

export default dbConnect;
