import React, {useState} from "react";
import {useParams} from "react-router-dom";
import BookDescription from "./BookDescription";
import NewBook from "./NewBook";

const LogBook = () => {

  const { bookId } = useParams();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="book-all-reviews">
      <BookDescription bookId={bookId}/>

      <button onClick={toggleForm}>
        {showForm ? "Cancel" : "Add to Catalogue"}
      </button>

      {showForm && <NewBook bookId={bookId}/>}
    </div>
  );
};

export default LogBook;