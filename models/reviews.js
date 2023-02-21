var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: String,
    rating: Number,
    message: String,
  });
  
  const Review = mongoose.model('Review', ReviewSchema);
  
  module.exports = Review;