import mongoose from "mongoose";

let connection = {};

export async function connect() {
  if (connection && mongoose.connection.readyState === 1) {
    // If already connected, use existing database connection
    return;
  }

  try {
    // Establish new database connection
    return mongoose.connect(`${process.env.MONGODB_URI}`).then((conn) => {
      connection = conn.connection;
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}
