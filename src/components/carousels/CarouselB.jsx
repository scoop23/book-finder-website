import { useEffect, useState } from 'react'
import CarouselBCard from './CarouselBCard.jsx'
import slideData from '../slideDemo.json';
import CodexDotCircle from '../icons/CodexDotCircle.jsx'




const CarouselB = () => {
  const [index, setIndex] = useState(0)
  const [data] = useState(slideData.slideData)

  // VALUE CONSTANTS FOR THE CAROUSEL
  // DIDNT use UseRef() as the carousel cards width not dynamic yet.
  const CARDWIDTH = 500; // in px
  const CONTAINERWIDTH = 525;
  const GAP = 80;

  function nextIndex() {
    if(index < data.length) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0);
    }
  }

  useEffect(() => { // useEffect runs after mount
    const delay = setInterval(() => {
      setIndex(prev => {
        if(prev < data.length - 1) {
          console.log(index)
          return prev + 1;         
        } else {
          console.log(index)
          return prev = 0; // start again at 0 which the components will 'react' to the state of the index .. see what i did there.,
        }
      })
    }, 5000);

    return () => clearInterval(delay)
  })

  function prevIndex() {
    if(index > 0) {
      setIndex(prev => prev - 1);
      console.log(index)
    }
  }
  
  return (
    <div className='carousel-b-outer-wrapper flex justify-center font-satoshi text-zinc-100 '>
      {/* <span className=''>Genres</span> */}
      <div className='carousel-b-main-wrapper w-[700px] h-[400px] flex items-center justify-center'>
        
        <div className='carousel-b w-[650px] h-[370px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center gap-2'>
        {/* prev tailwind config - w-[650px] h-[350px] */}
        {/* why am i 'raw-doggin' animations when i can use keyframes */}
          <div className='genre-tags-wrapper flex gap-4 w-[490px] flex-wrap h-[24px]'>
            <div className='genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer p-0.5 text-[13px] text-center flex justify-center items-center '>Romance</div>
            <div className='genre-tag w-[70px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Fiction</div>
            <div className='genre-tag w-[100px] h-[24px]  rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Non Fiction</div>
            <div className='genre-tag w-[70px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Drama</div>
            <div className='genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Adventure</div>
          </div>

        <div className='flex gap-4 w-[600px] items-center justify-center-safe'>
          <div className='bar w-[10px] h-[200px] bg-zinc-900 z-10 rounded-lg' 
            style={{
              boxShadow : "0 0 25px 20px rgba(24, 24, 27,3)"
            }}
          ></div>

          {/* <button className='h-[30px] p-2 flex items-center rounded-[40px] bg-zinc-400 cursor-pointer' onClick={() => prevIndex()}>prev</button> */}
          <div className='carouselB-main flex  w-[525px] h-[250px] overflow-hidden  items-center '>
              <div className='flex gap-[80px] carouselB-main' style=
              {
                { 
                  transform: `translateX(-${Math.max(0 , (CARDWIDTH + GAP) * index - (CONTAINERWIDTH - CARDWIDTH) / 2)}px)`, 
                  // formula i looked up on the internet quite good but the first index is still not centered.
                  // used math.max. because, when the index is 0 for example (500 + 80) * 0 = 0 and - (525 - 500) / 2) would be
                  // -12.5 and if you insert it in the translateX css it would be (-(-12.5px)) and in turn would be +12.5 
                  // which would shift the carousel to the right and disregard the 0 index card right?
                  transition : `0.4s ease`,
                  transformStyle : `preserve-3d`
                }
              }>
                {
                  data.map((demo , index) => (
                    <div key={index}>
                      <CarouselBCard data={demo}/> 
                    </div>
                  ))
                }
              </div>
              {/* <div className='carouselB-card w-[500px] h-[220px] bg-zinc-800 rounded-[20px] hover:shadow-custom2 hover:-translate-y-1.5 duration-400 shadow-zinc-600 flex'>
              </div> */} 
          </div>
          {/* <button className='h-[30px] p-2 flex items-center rounded-[40px] bg-zinc-400 cursor-pointer' onClick={() => nextIndex()}>next</button> */}
          <div className='bar w-[10px] h-[200px] bg-zinc-900 z-10 rounded-lg' 
          style={{
            boxShadow : "0 0 25px 20px rgba(24, 24, 27,3)"
          }}
          ></div>
        </div>
        
        <div className='flex'>
          {
            data.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className='dot cursor-pointer'
              >
                <CodexDotCircle active={i === index}/>
              </button>
            ))
          }
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default CarouselB