import React, {useEffect, useState} from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";

const AllReviewCards = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching reviews...");
        const response = await axios.get('http://localhost:5000/reviews');
        const data = response.data.content;

        // Parse the CSV data
        const parsedReviews = data.trim().split('\n').map((line) => {
          const [fileBookId, reviewerName, sentiment, reviewText, date] = line.split(',');
          return {
            bookId: fileBookId,
            reviewerName,
            sentiment,
            reviewText,
            date,
          };
        });

        // Filter reviews for the given bookId
        const bookReviews = parsedReviews.filter(review => review.bookId === bookId);

        setReviews(bookReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Could not fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="new-review-container">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            bookId={review.bookId}
            sentiment={review.sentiment}
            reviewText={review.reviewText}
            reviewAuthor={review.reviewerName}
            reviewDate={review.date}
          />
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default AllReviewCards;