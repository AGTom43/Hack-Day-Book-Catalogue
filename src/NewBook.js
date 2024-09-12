import React, {useState} from "react";
import axios from "axios";

const NewBook = ({bookId}) => {

  const [name, setName] = useState("");

  const today = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      bookId,
      loggerName: name,
      date: today,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/books", reviewData);
      console.log("Book Submitted:", response.data);
      // Clear form after submit
      setName("");
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

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default NewBook;