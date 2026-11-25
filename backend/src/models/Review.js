
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000
    }
  },
  { timestamps: true }
);

reviewSchema.index({ postId: 1, createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);
