const reviewsData = require('../models/reviews');

// Get reviews
async function getReviews() {
    return await reviewsData.find();
  }
  
  // Add new review
  async function addReviews(review) {
    const newReview = new reviewsData({
      name: review.name,
      rating: review.rating,
      message: review.message,
    });
    return await newReview.save();
  }

module.exports = {getReviews, addReviews}