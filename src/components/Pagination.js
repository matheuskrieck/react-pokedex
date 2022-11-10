import React from "react";
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const Paginantion = (props) => {
  const { page, totalPages, onLeftClick, onRightClick } = props;

  return (
    <div className="pagination-container">
      <button onClick={onLeftClick}>
        <div><AiFillLeftCircle /></div>
      </button>
      <div>
        {page} of {totalPages}
      </div>
      <button onClick={onRightClick}>
        <div><AiFillRightCircle /></div>
      </button>
    </div>
  );
};

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="28" height="28"><path d="M11.5 14.5l-4-4 4-4" fill="none" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round"></path></svg>

export default Paginantion;