import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


export function CodexDotCircle({ active }) {
  const circleRef = useRef()

  useEffect(() => {
    gsap.to(circleRef.current , {
      fill : active ? "#ffffff" : "none",
      ease: 'power2'
    })

  }, [active])

  return (
    <svg
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      className="dot-circle"
    >
      <circle
        ref={circleRef}
        cx={12}
        cy={12}
        r={4}
        stroke='#ffffff'
        fill='rgba(255,255,255,0)'
      />
    </svg>
  )
}
export default CodexDotCircle