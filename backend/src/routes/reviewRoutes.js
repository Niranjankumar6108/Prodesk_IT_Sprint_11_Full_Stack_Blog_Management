
const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review");
const Post = require("../models/Post");

const router = express.Router();

// Get reviews and rating summary for one blog
router.get("/posts/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID"
      });
    }

    const postExists = await Post.exists({ _id: id });

    if (!postExists) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }

    const [reviews, summary] = await Promise.all([
      Review.find({ postId: id })
        .sort({ createdAt: -1 })
        .lean(),

      Review.aggregate([
        { $match: { postId: new mongoose.Types.ObjectId(id) } },
        {
          $group: {
            _id: "$postId",
            count: { $sum: 1 },
            averageRating: { $avg: "$rating" }
          }
        }
      ])
    ]);

    const stats = summary[0] || {
      count: 0,
      averageRating: 0
    };

    return res.status(200).json({
      success: true,
      count: stats.count,
      averageRating: Number((stats.averageRating || 0).toFixed(1)),
      data: reviews
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch reviews"
    });
  }
});

// Add review to one blog
router.post("/posts/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID"
      });
    }

    const postExists = await Post.exists({ _id: id });

    if (!postExists) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters"
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a whole number between 1 and 5"
      });
    }

    if (
      typeof comment !== "string" ||
      comment.trim().length < 3 ||
      comment.trim().length > 1000
    ) {
      return res.status(400).json({
        success: false,
        message: "Review must be between 3 and 1000 characters"
      });
    }

    const review = await Review.create({
      postId: id,
      name: name.trim(),
      rating: numericRating,
      comment: comment.trim()
    });

    const summary = await Review.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$postId",
          count: { $sum: 1 },
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    const stats = summary[0] || { count: 0, averageRating: 0 };

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      count: stats.count,
      averageRating: Number((stats.averageRating || 0).toFixed(1)),
      data: review
    });
  } catch (error) {
    console.error("Create review error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit review"
    });
  }
});

module.exports = router;
