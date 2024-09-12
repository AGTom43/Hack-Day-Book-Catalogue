import React, {useState} from "react";

const BookDescription = ({ bookId }) => {

  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

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
    const id = bookId;
    if (id) {
      fetchBookDetails(id);
    }
  }, [bookId]);

  if (error) return <div>{error}</div>;
  if (!book) return <div>Loading...</div>;

  const BOOK_1_ADDED_BY = "Akhil Tom"

  const ID_TO_LINK = `https://books.google.co.uk/books?id=${bookId}`

  const { title, authors, imageLinks, description } = book.volumeInfo;

  // Function to clean HTML description
  const cleanDescription = (html) => {
    // Remove <br> tags and other unwanted tags or whitespace
    return html
      .replace(/<br\s*\/?>/gi, ' ') // Replace <br> tags with a space
      .replace(/<\/?[^>]+(>|$)/g, ""); // Remove all HTML tags
  };

  return (
    <div className="book-description">
      <div className="book-card">
        {imageLinks && (
          <img
            src={imageLinks.thumbnail}
            alt={`${title} book cover`}
            className="book-cover"
          />
        )}
        <div className="book-details">
          <h1 className="book-title">{title}</h1>
          <h3 className="book-author">
            {authors ? authors.join(", ") : "Unknown Author"}
          </h3>
          {/* Add a placeholder or description text here */}
          <p className="book-description-text">
            {cleanDescription(description || '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDescription;