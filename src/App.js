import React from "react";
import SearchArea from './SearchArea';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* Header Bar */}
      <div className="header-bar">
        <h1>Fivium Book Catalog</h1>
      </div>

      {/* Search Form */}
      <div className="search-container">
        <SearchArea/>
      </div>
    </div>
  );
};

export default App;
