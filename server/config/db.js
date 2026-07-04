const mongoose = require("mongoose");
const dns = require("dns");

// Set public DNS servers to resolve MongoDB Atlas SRV records correctly
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

module.exports = connectDB;
