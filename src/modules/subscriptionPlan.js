import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: String,
  features: [String],
});

export const SubscriptionPlan =
  mongoose.model(
    "SubscriptionPlan",
    subscriptionSchema
  );