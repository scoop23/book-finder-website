import React, { useEffect, useRef, useState } from 'react'
import ActionButton from '../../components/ActionButton'
import gsap, { Elastic } from 'gsap';


const DemoPage = () => {
  const aRef = useRef(null);
  const [isHovered , setIsHovered] = useState(false);

  function onhover() {
    setIsHovered(true);
  }

  function offhover() {
    setIsHovered(false);
  }

  useEffect(() => {
    if(aRef.current) {
      const tl = gsap.timeline();
      if(isHovered) {
        tl.fromTo(aRef.current , {
          attr : {
            rx : 20,
            ry : 20
          },
          autoAlpha : 0.5
        }, {
          attr : {
            rx : 100,
            ry : 100
          },
          autoAlpha : 1,
          duration : 1,
          ease : Elastic.easeInOut.config(1.5, 1)
        })
      } else {
        gsap.to(aRef.current, {
          attr : {
            rx : 20,
            ry : 20
          },
          duration : 1,
          ease : Elastic.easeInOut.config(1.5, 1),
          autoAlpha : 0.5
        })
      }
    }
  }, [isHovered])

  return (
    <div className='w-screen h-screen bg-amber-50'>
      <div className='demo-sidebar w-[400px] h-[400px] bg-amber-300 p-10 '>
        <svg className='group transition-all' width={250} height={250} viewBox="-100 -100 250 250">
          <defs>
            <filter id='myGoo' width='300%' height='-100%'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='3' result='blur'/>
            </filter>  
          </defs>
          <g id='g1' filter=''>  
            <ellipse rx={20} ry={20}  fill='#444446' ref={aRef} onMouseEnter={onhover} onMouseLeave={offhover}/>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default DemoPage;