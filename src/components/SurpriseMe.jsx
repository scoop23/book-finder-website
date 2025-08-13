import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
import book_empty from '../assets/book_empty.png';

const SurpriseMe = ({ state , dispatch }) => {
  // ignore this 
  // ---------------------------------------------------
  // get the width and height for boundaries
  // 10 is padding
  // persona 5 textbox
  const outerBoxFn = (sizeW, sizeH) => `
      M 31.7 20
      L ${sizeW - 10} 0
      L ${sizeW - 23} ${sizeH}
      L 5 ${sizeH - 12}
      Z
  `;

  const innerBoxFn = (sizeW, sizeH) => `
      M 33 23
      L ${sizeW - 20} 5
      L ${sizeW - 29} ${sizeH - 5}
      L 10 ${sizeH - 15}
      Z
  `
  function SvgExample({ sizeWidth, sizeHeight }) {
    const outerD = outerBoxFn(sizeWidth , sizeHeight)
    const innerD = innerBoxFn(sizeWidth , sizeHeight)
    return (
      <svg className='absolute' viewBox='0 0 300 300' width="230" height="200">
        
          {/* <path
            className="outer-box"
            d="M 10 160 L 160 140 L 140 210 L 0 210 Z"
            fill="white"
          /> */}
        <path
          className="outer-box"
          d={outerD}
          fill="white"
        />
        <path 
          className='inner-box'
          d={innerD}
          fill='black'
        />
      </svg>
    );
  }
  // ---------------------------------------------------

  // i used useRef for react to remember but not re-render everytime something changes
  const SurpriseMeWrapper = useRef();
  const canvasRef = useRef();
  const clickMeRef = useRef();
  const particleRef = useRef([]);
  const [stopId , setStopId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const youShouldReadRef = useRef()
  const [randomBook , setRandomBook] = useState([]);
  const bookImageRef = useRef();

  function createParticle(canvas) {
    const particle = {
      x : Math.random() * canvas.width, // start from a random position inside the canvas width
      y : canvas.height, // start at the height of the canvas 
      radius : Math.random() * 1 + 3, // random radius
      vx : (Math.random() - 0.5) * 2, // random horizontal velocity
      vy : -(Math.random() * 0.8) * 3, // random vertical velocity negative because negative nums are upwards
      alpha : 2,
      lifetime : 100,
      maxLifetime : 200
    }
    particle.vy *= 0.5;
    return particle;
  }

  function drawParticles(ctx, canvas) {
    let particlesArray = particleRef.current;
    ctx.clearRect(0,0, canvas.width , canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x , p.y , p.radius ,0 ,Math.PI * 2);
      // ctx.rect(p.x , p.y , 30 ,20);
      ctx.fillStyle = `rgba(255,40,20,${p.alpha})`;
      ctx.fill();
      ctx.shadowColor = "orange"
      ctx.shadowBlur = 20
      ctx.shadowOffSetX = 0
      ctx.shadowOffSetY = 0
      
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;

    });

    particlesArray = particlesArray.filter(p => p.alpha > 0); // only pulls out the particles that alphas greater than 0
  }

  function onMouseEnterCanvas() {
    const particleArray = particleRef.current;
    const canvas = canvasRef.current;
    const clickMe = clickMeRef.current; 

    if(clickMe) {
      gsap.to(clickMe ,{
        duration : 0.2,
        opacity : 1,
      })
    }

    if(stopId && isClicked) {
      return;
    } // return if hovered again

    const id = setInterval(() => {
      particleArray.push(createParticle(canvas)); // while mouse is hovering push createdParticles with random positions
    }, 30);
    setStopId(id);
  }

  function onMouseLeaveCanvas() {
    const clickMe = clickMeRef.current
    if(clickMe) {
        gsap.to(clickMe ,{
        duration : 0.2,
        opacity : 0
      })
    }

    clearInterval(stopId);
  }

  function onClick() {
    const tl = gsap.timeline();
    const canvas = canvasRef.current;
    const wrapper = SurpriseMeWrapper.current;
    const clickMe = clickMeRef.current;


    setTimeout(() => {
      setIsClicked(true);
    }, 500)  
    gsap.to(clickMe , {
      duration : 0.1,
      opacity : 0,
    })


    if(wrapper && canvas) {
      tl.to(wrapper , {
        backgroundColor : "white",
        duration : 1,
        borderRadius : '15px',
        onComplete : () => {
          clearInterval(stopId);
          gsap.to(clickMe, {
            visibility : 'hidden'
          })
          setTimeout(() => {
            gsap.to(canvas, {
              visibility : 'hidden',
            });
          }, 500)
        }
      });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function animate() {
      drawParticles(ctx, canvas); // renders every particles in the array and remove particles below opacity of 0. all the while reducing its alpha value
      requestAnimationFrame(animate); 
    }

    animate();
  }, [])

  useEffect(() => {
    if(state.carouselAData){
        setRandomBook(state.carouselAData?.items?.[7]);
    }
  }, [state.carouselAData])

  useEffect(() => {
    const tl = gsap.timeline();
      if(youShouldReadRef.current && isClicked) {
        tl.to(youShouldReadRef.current, {
          duration : 1,
          opacity : 1,
          y : -56,
        }).to(bookImageRef.current , {
          opacity : 1,
          y : -60,
          border : '1px solid black'
        })
      }
  })

  const image = randomBook?.volumeInfo?.imageLinks?.smallThumbnail || book_empty;
  

  return (
    <div className='surprise-me-wrapper h-full'>
      <div className='surprise-me-main flex justify-center items-center h-full flex-col gap-2'>

        <div className='text-white font-avenir'>Have no idea what to read?</div>

        <div className='surprise-me bg-zinc-900 w-[250px] h-[230px] rounded-2xl border-1 border-zinc-400'>

          <div className='inner-main flex flex-col w-full h-full justify-center items-center cursor-pointer relative ' onMouseEnter={onMouseEnterCanvas} onMouseLeave={onMouseLeaveCanvas} ref={SurpriseMeWrapper}>
            <canvas ref={canvasRef} id='my-canvas' className='absolute rounded-2xl' width={245} height={229} onClick={() => onClick()}></canvas>
            {/* <SvgExample sizeWidth={200} sizeHeight={100}/> */}
            <div className='you-should-read absolute top-15 opacity-0 ' ref={youShouldReadRef}>
              You Should Read
            </div> 

            { isClicked && 
              <div className='the-surprise-book'>
                <img 
                src={image}
                className='rounded-2xl opacity-0 absolute left-15 max-h-[190px]'
                ref={bookImageRef}
                />
              </div>
            }
            
            <div className='click-me text-white text-[30px] opacity-0  duration-500 select-none' draggable={false} ref={clickMeRef}>
              Click me!
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SurpriseMe;  