import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SearchPageNone = () => {
  const navigate = useNavigate();
  const ButtonRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  function onFinish() {
    setIsActive(false);
  }

  useEffect(() => {
    if (ButtonRef.current) {
      gsap.fromTo(
        ButtonRef.current,
        { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.in" }
      )
    }
  }, [])

  useEffect(() => {
    return () => {
      if (ButtonRef.current) {
        gsap.to(
          ButtonRef.current,
          {
            autoAlpha: 0,
            x: 20,
            duration: 0.4,
            ease: "power3.in",
            onComplete: onFinish
          }
        )
      }
    }
  }, []);

  function goBack() {
    if (ButtonRef.current) {
      gsap.to(ButtonRef.current, {
        autoAlpha: 0,
        x: 40,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setTimeout(() => {
            sessionStorage.setItem("fromNone", "true");
            navigate("/search");
          }, 500)
        } // navigate only after animation finishes
      });
    }
  }

  return (
    <div>
      {isActive && (
        <button className='page-btn max-w-[110px] px-[15px] py-[10px] rounded-[65px] cursor-pointer hover:bg-gray-500 transition-all duration-250 text-center text-white bg-[#212129] shadow-custom4-first-content opacity-0' onClick={() => goBack()} ref={ButtonRef}>
          Go Back
        </button>
      )}

    </div>

  )
}

export default SearchPageNone;
