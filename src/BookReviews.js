import React, {useState} from "react";
import {useParams} from "react-router-dom";
import BookDescription from "./BookDescription";
import AllReviewCards from "./AllReviewCards";
import NewReview from "./NewReview";

const BookReviews = () => {
  const { bookId } = useParams();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="book-all-reviews">
      <BookDescription bookId={bookId}/>

      <button onClick={toggleForm}>
        {showForm ? "Cancel" : "Add New Review"}
      </button>

      {showForm && <NewReview bookId={bookId}/>} {/* Show the form when the button is clicked */}

      <AllReviewCards bookId={bookId}/>
    </div>
  );
};

export default BookReviews;