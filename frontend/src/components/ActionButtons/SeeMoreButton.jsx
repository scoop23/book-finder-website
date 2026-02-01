import React from 'react'
import gsap from 'gsap'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SeeMoreButton = ({ size = 40, clickAnimation, ...props }) => {
  const seeMoreIconRef = useRef(null);
  // when CLICKED navigate() to a book with the ID
  function seeMoreButtonClicked() {
    // gsap.to(seeMoreIconRef.current, {
    //   x : 10,
    //   duration : 0.5,
    //   onComplete : () => {
    if (clickAnimation) clickAnimation();
    //   }
    // });
  }

  return (

    <svg
      ref={seeMoreIconRef}
      width={size}
      height={size}
      viewBox="256 256 512 512"
      onClick={() => seeMoreButtonClicked()}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <path
        fill={"#ffffff"}
        d="M512 704c-12.496 0-24.992-4.752-34.336-14.096l-192-192c-18.656-18.656-18.656-48.992 0-67.648s48.992-18.656 67.648 0L512 579.2l158.688-158.688c18.656-18.656 48.992-18.656 67.648 0s18.656 48.992 0 67.648l-192 192c-9.344 9.344-21.84 14.096-34.336 14.096z"
      />
    </svg>
  )
}

export default SeeMoreButton;
