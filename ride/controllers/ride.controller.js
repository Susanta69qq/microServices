import { rideModel } from "../models/ride.models.js";

export const createRide = async (req, res, next) => {


  const { pickup, destination } = req.body;

    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    })

    await newRide.save();

};
