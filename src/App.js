import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchArea from './SearchArea';
import NavBar from './NavBar';
import './App.css';
import BookCatalogue from "./BookCatalogue";
import BookReviews from "./BookReviews";
import LogBook from "./LogBook";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Header Bar */}
        <header className="header-bar">
          <h1>Fivium Book Catalogue</h1>
        </header>

        {/* Navigation Bar */}
        <NavBar />

        {/* Search Area and Book Results */}
        <main>
          <Routes>
            <Route path="/" element={<SearchArea />} />
            <Route path="/all-reviews" element={<BookCatalogue />} />
            <Route path="/books/:bookId" element={<BookReviews />} />
            <Route path="/new-book/:bookId" element={<LogBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
