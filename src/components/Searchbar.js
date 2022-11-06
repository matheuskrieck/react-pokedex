import React, { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("ditto");

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onButtonClickHandler = () => {
    console.log("pokemon: ", search);
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Search Pokemon" onChange={onChangeHandler} />
        <div className="searchbar-btn">
          <button onClick={onButtonClickHandler}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;