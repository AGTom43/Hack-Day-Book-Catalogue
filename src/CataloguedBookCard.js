import React, { useState } from 'react';
import {Link, Route} from "react-router-dom";
import BookCatalogue from "./BookCatalogue";

const CataloguedBookCard = ({ bookId, bookAddedBy }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const ADDED_BY = bookAddedBy;

  // Function to fetch book details
  const fetchBookDetails = async (id) => {
    const API_URL = `https://www.googleapis.com/books/v1/volumes/${id}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      setError("Error fetching book details.");
    }
  };

  // Extract book ID and fetch details
  const extractBookId = (link) => {
    const match = link.match(/id=([^&]+)/);
    if (match) {
      return match[1];
    }
    return null;
  };

  React.useEffect(() => {
    const id = extractBookId(bookId);
    if (id) {
      fetchBookDetails(id);
    }
  }, [bookId]);

  if (error) return <div>{error}</div>;
  if (!book) return <div>Loading...</div>;

  const { title, authors, imageLinks } = book.volumeInfo;

  return (
    <div className="catalogued-book">
      {imageLinks && (
        <img
          src={imageLinks.thumbnail}
          alt={`${title} book cover`}
          className="book-cover"
        />
      )}
      <h3>{title}</h3>
      <p>Author: {authors ? authors.join(", ") : "Unknown Author"}</p>
      <p>Logged By: {ADDED_BY}</p>
      <Link to={`/books/${extractBookId(bookId)}/`}>See All Reviews</Link>
    </div>
  );
};

export default CataloguedBookCard;