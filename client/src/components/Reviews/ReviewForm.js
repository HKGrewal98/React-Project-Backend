import React, { useState, useEffect } from 'react';
import './Reviews.css'; // import CSS file

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Display success alert message
    alert('Review added successfully!');
    // Reset form fields
    setName('');
    setRating(0);
    setMessage('');

    const newReview = { name, rating, message };
    //fetch data from backend and db
    fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
    .then((res) => res.json())
    .then((data) => {
      setReviews([...reviews, data]);
      setName('');
      setRating('');
      setMessage('');
    })
    .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch('/reviews')
      .then((res) => res.json())
      .then((data) =>
        setReviews(data)
      )
      .catch((err) => console.error(err));
  }, []);
  

  return (
    <div className="rform-section">
      <form className="review-form" onSubmit={handleSubmit}>
      <h3>Add review :</h3><br/>
      <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Rating:
          <select value={rating} onChange={event => setRating(event.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <br />
        <label>
          Comment:
          <textarea value={message} onChange={event => setMessage(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;
