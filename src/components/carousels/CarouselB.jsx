import { useEffect, useState, useRef} from "react";
import CarouselBCard from "./CarouselBCard.jsx";
import slideData from "../slideDemo.json";
import CodexDotCircle from "../icons/CodexDotCircle.jsx";
import gsap from 'gsap';
import genres from "../../constants/genres.jsx";
import Loading from "../Loading.jsx";

const CarouselB = ({ state , dispatch }) => {
  const [index, setIndex] = useState(0);
  const [genreColor, setGenreColor] = useState('');
  const carouselSlider = useRef();
  const [genreData , setGenreData] = useState([])
  const [remainData , setRemainData] = useState([])
  
  useEffect(() => {
    if(state.genreData.items) {
      const temp = state.genreData.items.slice(0,6);
      setGenreData(temp);
      setRemainData(state.genreData.items.slice(7));
    }

  }, [state.genreData])

  // VALUE CONSTANTS FOR THE CAROUSEL
  // DIDNT use UseRef() as the carousel cards width not dynamic yet.
  const CARDWIDTH = 500; // in px
  const CONTAINERWIDTH = 525; // in px
  const GAP = 80;// in px
  const shift = Math.max(0 , (CARDWIDTH + GAP) * index - (CONTAINERWIDTH - CARDWIDTH) /2)
  const myGenres = Object.keys(genres) // get keys
  const availableGenres = myGenres.slice(0,5); // get 6 genres
  const myCapitalizedGenres = availableGenres.map(g => {
    const capitalizedG = g[0].toUpperCase() + g.slice(1)
    for (let i = 0 ; i < capitalizedG.length; i++) {
      if(capitalizedG[i] === ' ') {
        const noSpace = capitalizedG.split(' ')
        return noSpace
      }
    }
    return capitalizedG;
  }) // capitalize

  function genreClick(genre) {
    let temp = ''
    let modGenre = ''
    if(Array.isArray(genre)) {
      temp = genre.join(' ');
      modGenre = temp.toLowerCase();
    } else {
      modGenre = genre.toLowerCase();
    }
    const genreColorHex = genres[modGenre]; // will use someday
    setGenreColor(genreColorHex);
    dispatch({ type : "SET_GENRE"  , payload : genre});
  }

  useEffect(() => {
    // useEffect runs after mount
    const delay = setInterval(() => {
      setIndex((prev) => {
        if (prev < genreData.length - 1) {
          return prev + 1;
        } else {
          return (prev = 0); // start again at 0 which the components will 'react' to the state of the index .. see what i did there.,
        }
      });
    }, 5000);

    return () => clearInterval(delay);
  });

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

  const genre = () => {
    return myCapitalizedGenres.map(genre => {
      let theGenre = ''
      if(Array.isArray(genre)) {
        theGenre = genre[0]
      } else {
        theGenre = genre
      }

      return (
      <div
      className="genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer p-0.5 text-[13px] text-center flex justify-center items-center"
      onClick={() => genreClick(genre)}
      >
        {theGenre}
      </div>
      )
    })
  }

  return (
    <div className="carousel-b-outer-wrapper flex justify-center font-satoshi text-zinc-100 ">
      <div className="carousel-b-main-wrapper w-[700px] h-[400px] flex items-center justify-center">
        <div className="carousel-b w-[650px] h-[365px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center gap-3.5">
          <div className="genre-tags-wrapper flex gap-4 w-[490px] flex-wrap h-[24px]">
            {genre()}
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
                    <CarouselBCard data={data} CARDWIDTH={CARDWIDTH}/>
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
