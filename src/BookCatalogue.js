import React, {useEffect, useState} from "react";
import BookResults from "./BookResults";
import CataloguedBookCard from "./CataloguedBookCard";
import axios from "axios";

const BookCatalogue = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        const data = response.data.content;

        // Parse the CSV data
        const parsedBooks = data.trim().split('\n').map((line) => {
          const [bookId, loggerName, date] = line.split(',');
          return {
            bookId,
            loggerName,
            date,
          };
        });

        setBooks(parsedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Could not fetch books');
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="new-review-container">
      <h1>All Catalogued Books</h1>
      <p>Here you can find all the books that have been logged by Fivium Employees</p>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book, index) => (
            <CataloguedBookCard
              key={book.bookId}
              bookId={book.bookId}
              bookAddedBy={book.loggerName}
            />
          ))
        )  : (
          <p>No reviews yet.</p>
          )}
      </div>
    </div>
  );
};

export default BookCatalogue;