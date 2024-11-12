const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://wahababdal:55055144@cluster0.6xulh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
