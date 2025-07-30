import { useEffect, useState, useRef} from "react";
import CarouselBCard from "./CarouselBCard.jsx";
import CodexDotCircle from "../icons/CodexDotCircle.jsx";
import gsap from 'gsap';
import genres from "../../../../shared/constants/genres.json";
import {toHex} from "../../../../shared/constants/genres.jsx";
import Loading from "../Loading.jsx";
import CarouselGenres from "./CarouselGenres.jsx";

const CarouselB = ({ state , dispatch }) => {
  const [index, setIndex] = useState(0);
  const [genreColor, setGenreColor] = useState('bg-[#2ab50b]');
  const carouselSlider = useRef();
  const [genreData , setGenreData] = useState([]);
  // const [remainData , setRemainData] = useState([]);
  const clearID = useRef(null);  


  const carouselCardRef = useRef([]); // created an array of refs because a single ref can only store 1 dom node, and base on the index State it will pass in the right ref for the carouselCard, so that each card can have a refs. and in turn will have access to the individual DOM
  
  useEffect(() => {
    if(state.genreData.items) {
      const temp = state.genreData.items.slice(0,6);
      setGenreData(temp);
      // setRemainData(state.genreData.items.slice(7));
    }

  }, [state.genreData])

  // VALUE CONSTANTS FOR THE CAROUSEL
  // DIDNT use UseRef() as the carousel cards width not dynamic yet.
  const CARDWIDTH = 500; // in px
  const CONTAINERWIDTH = 525; // in px
  const GAP = 80;// in px
  const shift = Math.max(-25 , (CARDWIDTH + GAP) * index - (CONTAINERWIDTH - CARDWIDTH) /2)
  // if the 2nd argument is less than 0 it will default to -25
  // get the hex value of the constant

  const hexColor = toHex(genreColor);
  

  function whileHover() {
    if(carouselCardRef.current[index]) { // animate at what index is the ref
      gsap.to(carouselCardRef.current[index] , {
        boxShadow : `0px 10px 15px -3px ${hexColor}`,
        duration : 0.4,
        y : -10,
        ease : "power1.out"
      })
    }

    clearInterval(clearID.current);
    console.log("clearing ", clearID.current)
  }
  
  function offHoverCard() {
    if(carouselCardRef.current[index]) {
      gsap.to(carouselCardRef.current[index] , {
        boxShadow : `0px 0px 0px 0px ${hexColor}`,
        duration : 0.4,
        y : 0,
        ease : "power1.out"
      })
    }

    if(clearID.current){
      clearInterval(clearID.current);
      clearID.current = null;
      console.log("cleared interval on hover");
    }

    clearID.current = setInterval(() => {
      setIndex((prev) => (prev < genreData.length - 1) ? prev + 1 : 0);
    }, 5000);
  }

  useEffect(() => {
    // useEffect runs after mount
    clearID.current = setInterval(() => {
      setIndex((prev) => {
        if (prev < genreData.length - 1) {
          return prev + 1;
        } else {
          return 0 // start again at 0 which the components will 'react' to the state of the index .. see what i did there.,
        }
      });
    }, 5000);

    return () => clearInterval(clearID.current);
  }, [genreData]);


  useEffect(() => {
    if(carouselSlider.current) {
      gsap.to(carouselSlider.current, {
        duration : 0.8,
        x : -shift,
        ease : "expo.inOut"
        // style={{
                //   transform: `translateX(-${Math.max(
                //     0,
                //     (CARDWIDTH + GAP) * index - (CONTAINERWIDTH - CARDWIDTH) / 2
                //   )}px)`,
        // formula i looked up on the internet quite good but the first index is still not centered.
        // used math.max. because, when the index is 0 for example (500 + 80) * 0 = 0 and - (525 - 500) / 2) would be
        // -12.5 and if you insert it in the translateX css it would be (-(-12.5px)) and in turn would be +12.5
        // which would shift the carousel to the right and disregard the 0 index card right?
      })
    }
  })

  return (
    <div className="carousel-b-outer-wrapper flex justify-center font-satoshi text-zinc-100 ">
      <div className="carousel-b-main-wrapper w-[700px] h-[400px] flex items-center justify-center">
        <div className="carousel-b w-[650px] h-[365px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center gap-3.5">
          <div className="genre-tags-wrapper flex gap-4 w-[490px] flex-wrap h-[24px]">
            <CarouselGenres genres={genres} dispatch={dispatch} setGenreColor={setGenreColor}/>
          </div>

          <div className="flex gap-4 w-[600px] items-center justify-center-safe">
            <div className="bar w-[10px] h-[200px] bg-zinc-900 z-10 rounded-lg"
              style={{
                boxShadow: "0 0 25px 20px rgba(24, 24, 27, 3)",
              }}
            ></div>
            <div className={`carouselB-main flex h-[250px] overflow-hidden  items-center `} style={{
              boxShadow: `inset 20px 0 20px rgba(24, 24, 27,3),     /* left */
                          inset -20px 0 20px rgba(24, 24, 27,3),    /* right */
                          inset 0 0 10px rgba(0, 0, 0, 1)         /* center */`,
              width : `${CONTAINERWIDTH}px`
            }}> {/* moved constants to  */}

            { 
            genreData ? (
              <div
                className={`flex carouselB-main`}
                ref={carouselSlider}
                style={{
                  gap : `${GAP}px`
                }}
              >
                {genreData.map((data, index) => (
                  <div key={index}>
                    <CarouselBCard 
                    data={data} 
                    CARDWIDTH={CARDWIDTH} 
                    whileHover={whileHover} 
                    offHoverCard={offHoverCard}
                    ref={(el) => (carouselCardRef.current[index] = el)} // 
                    />
                  </div>
                ))}
              </div>
              ) : (
                <div className="w-full h-full">
                 <Loading/>
                </div>
              )
            } 
          </div>
          <div
              className="bar w-[10px] h-[200px] bg-zinc-900 z-10 rounded-lg"
              style={{
                boxShadow: "0 0 25px 20px rgba(24, 24, 27,3)",
              }}
            ></div>
          </div>

          <div className="flex">
            {genreData.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="dot cursor-pointer"
              >
                <CodexDotCircle active={i === index} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselB;
