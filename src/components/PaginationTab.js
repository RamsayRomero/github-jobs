import React, { useRef } from 'react';

const PaginationTab = ({ history, page }) => {
  const buttonRef = useRef(null);
  let active = false;
  let location = history.location.pathname + history.location.search;
  if (location.charAt(location.length - 1) === page.toString()) {
    active = true;
  }
  location = location.slice(0, -1) + page;
  return (
    <button
      ref={buttonRef}
      onClick={() => {
        history.push(location);
        buttonRef.current.blur();
      }}
      className={`h-9 w-9 flex justify-center items-center border text-xs rounded-lg
    ${
      active
        ? 'text-white bg-blue-500 border-blue-500'
        : 'border-gray-400 text-gray-400  hover:text-blue-500 hover:border-blue-500'
    } `}
    >
      {page}
    </button>
  );
};

export default PaginationTab;
