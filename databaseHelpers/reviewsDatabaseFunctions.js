const reviewsData = require('../models/reviews');
const resturantId = "65348fa2368660f0a932b73e"
// Get reviews
async function getReviews() {
    return await reviewsData.find({resturantId:resturantId});
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