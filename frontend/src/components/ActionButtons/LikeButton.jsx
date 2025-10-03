// LikeButton.jsx
import React, { useState } from "react";

const LikeButton = ({ fill = "black", size = 24 , clickAnimation }) => {
  const [isLiked, setIsLiked] = useState(false);

  function onLike() {
    setIsLiked(!isLiked);

    clickAnimation();
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      onClick={() => onLike()}
      style={{ cursor: "pointer" }}
    >
      <path
        fill={isLiked ? "red" : "fill"}
        stroke="currentColor"
        strokeWidth="2"
        d="M12 20a1 1 0 0 1-.561-.172c-.225-.151-5.508-3.73-7.146-5.371C2.462 12.626 2.25 10.68 2.25 9.375A5.38 5.38 0 0 1 7.625 4c1.802 0 3.398.891 4.375 2.256A5.37 5.37 0 0 1 16.375 4a5.38 5.38 0 0 1 5.375 5.375c0 1.305-.212 3.251-2.043 5.082c-1.641 1.641-6.923 5.22-7.146 5.371A1 1 0 0 1 12 20Z"
      />
    </svg>
  );
};

export default LikeButton;
