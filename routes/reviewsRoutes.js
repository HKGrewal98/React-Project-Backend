const {express, app} = require('../config/server')
const reviewsRouter = express.Router();
const dbMethods = require('../databaseHelpers/reviewsDatabaseFunctions')

// GET reviews to get all reviews
reviewsRouter.get('/', async (req, res) => {
    try {
      const reviews = await dbMethods.getReviews();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST reviews to add a new review
  reviewsRouter.post('/', async (req, res) => {
    try {
      const newReview = await dbMethods.addReviews(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = reviewsRouter;
