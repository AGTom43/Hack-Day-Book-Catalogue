import React from "react";
import './App.css';
import {Link} from "react-router-dom";

const BookResults = ({ books }) => {

  // Extract book ID and fetch details
  const extractBookId = (link) => {
    const match = link.match(/id=([^&]+)/);
    if (match) {
      return match[1];
    }
    return null;
  };

  return (
    <div className="book-results">
      {books.map((book) => {
        const { title, authors, imageLinks, previewLink } = book.volumeInfo;
        return (
          <div key={book.id} className="book-item">
            {imageLinks && (
              <img
                src={imageLinks.thumbnail}
                alt={`${title} book cover`}
                className="book-cover"
              />
            )}
            <h3>{title}</h3>
            <p>Author: {authors ? authors.join(", ") : "Unknown Author"}</p>
            {previewLink && (
              <a href={previewLink} target="_blank" rel="noopener noreferrer">
                View on Google Books
              </a>
            )}
            <div>
              <Link to={`/new-book/${extractBookId(previewLink)}/`}>Add to Catalogue</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookResults;