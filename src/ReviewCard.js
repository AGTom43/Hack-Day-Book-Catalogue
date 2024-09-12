import React, {useState} from "react";

const ReviewCard = ( {book, sentiment, reviewText, reviewAuthor, reviewDate}) => {

  const [reviews, setReviews] = useState([]);
  let reviewSentiment;


  const sentimentToEmoji = (sentiment) => {
      if (sentiment === "Positive") {
        return "/smiley.png";
      }
      else if (sentiment === "Negative") {
        return "/sad.png";
      }
      else{
        return "/middle.png";
    }
  }

  return (
    <div className="book-review">
      <img
        src={sentimentToEmoji(sentiment)}
        alt="smiley"
        className="review-icon"
      />
      <div className="review-content">
        <div className="review-author">
          <strong><u>{reviewAuthor}</u></strong>
        </div>
        <div className="review-text">
          {reviewText}
        </div>
        <div className="review-date">
          {reviewDate}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;