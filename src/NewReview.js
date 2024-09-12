import React, {useState} from "react";
import axios from "axios";

const NewReview = ({bookId}) => {

  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [sentiment, setSentiment] = useState("positive");

  const today = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      bookId,
      reviewerName: name,
      sentiment,
      review,
      date: today,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/reviews", reviewData);
      console.log("Review Submitted:", response.data);
      // Clear form after submit
      setReview("");
      setName("");
      setSentiment("positive");
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="new-review-container">
      <form onSubmit={handleSubmit} className="new-review-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>

        <label>
          Sentiment:
          <div className="sentiment-options">
            <label>
              <input
                type="radio"
                value="positive"
                checked={sentiment === "positive"}
                onChange={() => setSentiment("positive")}
              />
              Positive
            </label>
            <label>
              <input
                type="radio"
                value="middle"
                checked={sentiment === "middle"}
                onChange={() => setSentiment("middle")}
              />
              Middle
            </label>
            <label>
              <input
                type="radio"
                value="negative"
                checked={sentiment === "negative"}
                onChange={() => setSentiment("negative")}
              />
              Negative
            </label>
          </div>
        </label>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default NewReview;