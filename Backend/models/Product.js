
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    category: {
      type: String,
      required: true,
      enum: ["Handmade", "Beauty", "Home Decor"],
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    seller: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    emoji: {
      type: String,
      default: "🛍️",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
