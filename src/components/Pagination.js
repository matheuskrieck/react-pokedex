import React from "react";

const Paginantion = (props) => {
  const { page, totalPages, onLeftClick, onRightClick } = props;

  return (
    <div className="pagination-container">
      <button onClick={onLeftClick}>
        <div>&lt;</div>
      </button>
      <div>
        {page} of {totalPages}
      </div>
      <button onClick={onRightClick}>
        <div>&gt;</div>
      </button>
    </div>
  );
};

export default Paginantion;