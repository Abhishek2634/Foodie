import Review from "../models/reviewModel.js";
import Food from "../models/foodModel.js";
import asyncHandler from '../utils/asyncHandler.js';

export const createReview = asyncHandler(async (req, res) => {
  const { foodId, rating, comment } = req.body;
  const userId = req.user._id;

  const alreadyReviewed = await Review.findOne({
    food: foodId,
    user: userId,
  });
  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: "You already reviewed this food item." });
  }

  const review = await Review.create({
    user: userId,
    food: foodId,
    rating: Number(rating),
    comment,
  });

  const reviews = await Review.find({ food: foodId });
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = total / reviews.length;

  await Food.findByIdAndUpdate(foodId, {
    averageRating: avg.toFixed(1),
    numReviews: reviews.length,
  });

  res.status(201).json({ success: true, review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  review.rating = rating ?? review.rating;
  review.comment = comment ?? review.comment;

  await review.save();

  const reviews = await Review.find({ food: review.food });
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = reviews.length ? total / reviews.length : 0;

  await Food.findByIdAndUpdate(review.food, {
    averageRating: avg.toFixed(1),
    numReviews: reviews.length,
  });

  res.json({ success: true, updatedReview: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) return res.status(404).json({ message: "Review not found" });

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const foodId = review.food;

  await Review.findByIdAndDelete(reviewId);

  const reviews = await Review.find({ food: foodId });
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = reviews.length ? total / reviews.length : 0;

  await Food.findByIdAndUpdate(foodId, {
    averageRating: avg.toFixed(1),
    numReviews: reviews.length,
  });

  res.json({ success: true, message: "Review deleted" });
});

export const getReviewsByFood = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const reviews = await Review.find({ food: foodId }).populate("user", "name");
  res.json(reviews);
});
