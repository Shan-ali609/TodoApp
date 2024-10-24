import mongoose from "mongoose";

export default async function connect() {
  if (mongoose.connections[0].readyState) return;

  const MongoUrl = process.env.MONGODB_URL;

  try {
    await mongoose.connect(MongoUrl),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

    console.log("Connection Successfully");
  } catch (error) {
    console.log(error);

    throw new Error("Error Connecting Mongoose");
  }
}
