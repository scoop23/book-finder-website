// BookmarkButton.jsx
import React, { useState } from "react";

const BookmarkButton = ({ fill = "black", size = 24, clickAnimation, ...props }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  function onBookmark() {
    setIsBookmarked(!isBookmarked);

    if (clickAnimation) clickAnimation();
  }

  return (
    <svg
      onClick={onBookmark}  
      xmlns="http://www.w3.org/2000/svg"
      width={size}           
      height={size}
      viewBox="0 0 24 24"
      {...props}
      style={{ cursor: "pointer" }} 
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        fill={isBookmarked ? "#ffe600" : "white"}
        d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
      />
    </svg>
  );
};

export default BookmarkButton;
