import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("CaptainService connected to MongoDB");
    })
    .catch((error) => {
      console.log("CaptainService could not connect to MongoDB");
      console.log(error);
    });
};

export default connect;
