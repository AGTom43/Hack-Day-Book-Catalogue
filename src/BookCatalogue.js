import React from "react";
import BookResults from "./BookResults";
import CataloguedBookCard from "./CataloguedBookCard";

const BookCatalogue = () => {

  const BOOK_1_LINK = "https://books.google.co.uk/books?id=saONEAAAQBAJ&dq=dune&hl=en&cd=1&source=gbs_api"
  const BOOK_2_LINK ="https://books.google.co.uk/books?id=b2ReHAAACAAJ&dq=hyperion&hl=&cd=4&source=gbs_api"

  const BOOK_1_ADDED_BY = "Akhil Tom"
  const BOOK_2_ADDED_BY = "Akhil Tom"

  return (
    <div className="all-reviews">
      <h1>All Catalogued Books</h1>
      <p>Here you can find all the books that have been logged by Fivium Employees</p>
      <div className="review-grid">
        <CataloguedBookCard bookId={BOOK_1_LINK} bookAddedBy = {BOOK_1_ADDED_BY} />
        <CataloguedBookCard bookId={BOOK_2_LINK} bookAddedBy = {BOOK_2_ADDED_BY} />
      </div>
    </div>
  );
}

export default BookCatalogue;