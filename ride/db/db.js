import mongoose from "mongoose";

const connect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("rideService Connected to MongoDB");
    })
    .catch((error) => {
      console.log(
        "rideService getting Error connecting to MongoDB",
        error.message
      );
    });
};

export default connect;
