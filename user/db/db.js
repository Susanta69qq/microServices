import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("UserService connected to MongoDB");
    })
    .catch((error) => {
      console.log("UserService could not connect to MongoDB");
      console.log(error);
    });
};

export default connect;