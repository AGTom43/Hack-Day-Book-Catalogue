import React, { useState } from "react";
import './App.css';
import BookResults from "./BookResults";

const SearchArea = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const MAX_RESULTS = 10;

  // Handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  // Fetch books from Google Books API
  const fetchBooks = async (searchQuery) => {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data.items ? data.items.slice(0, MAX_RESULTS) : []); // Limit results
    } catch (error) {
      console.error("Error fetching books:", error);
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

      {/* Book Results */}
      <BookResults books={books} />
    </div>
  );
};

export default SearchArea;
