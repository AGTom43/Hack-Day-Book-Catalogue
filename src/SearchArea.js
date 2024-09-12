import React, { useState } from "react";
import './App.css';

const SearchArea = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  // Function to handle search input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    fetchBooks(query);
  };

  // Function to fetch books from Google Books API
  const fetchBooks = async (searchQuery) => {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data.items || []); // Update state with fetched books
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error);
    }
  };

  return (
    <div className="search-area">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Display the book results */}
      <div className="book-results">
        {books.map((book) => {
          const { title, authors, imageLinks } = book.volumeInfo;
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchArea;
