import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings'; // converting ratings to stars
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  fetch('/reviews')
  .then((res) => res.json())
  .then((data) => setReviews(data))
  .catch((err) => console.error(err));
}, []);

const ratingsCount = reviews.reduce((count, review) => {
  const rating = review.rating;
  return {
  ...count,
  [rating]: (count[rating] || 0) + 1,
  };
}, {});

const ratingsTableRows = Object.keys(ratingsCount).map(rating => (
  <tr key={rating}>
  <td className="star">{'\u2605'.repeat(rating)}{'\u2606'.repeat(5 - rating)}</td>
  <td>{ratingsCount[rating]}</td>
  </tr>
));

return (
  <div className="reviews-section">
    <h2>Reviews : </h2>
    <ul>
      {reviews.map(review => (
      <li key={review.id}>
        <p>{review.name} &emsp; &emsp; &emsp; &emsp; 
          <StarRatings
            rating={review.rating}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
            numberOfStars={5}
           />
        </p>
        <p>{review.message}</p>
      </li>
      ))}
    </ul><br/>
    <div className="ratings-table">
      <h2>Ratings Summary :</h2><br/>
      <table>
        <thead>
          <tr>
            <th>Ratings</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {ratingsTableRows}
        </tbody>
      </table>
    </div>
  </div>
);
}
export default Reviews;
