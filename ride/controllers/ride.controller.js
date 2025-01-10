import { rideModel } from "../models/ride.models.js";
import { publishToQueue, subscribeToQueue } from "../service/rabbit.js";

export const createRide = async (req, res, next) => {
  const { pickup, destination } = req.body;

  const newRide = new rideModel({
    user: req.user._id,
    pickup,
    destination,
  });

  await newRide.save();
  publishToQueue("new-ride", JSON.stringify(newRide));
  res.send(newRide);
};
