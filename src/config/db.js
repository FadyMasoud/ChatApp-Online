const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Connection_Production);
    console.log("True:**MongoDB Connected Successfully**");
  } catch (error) {
    console.error("False:### DB Connection Failed ###", error);
    process.exit(1);
  }
};

module.exports = connectDB;
