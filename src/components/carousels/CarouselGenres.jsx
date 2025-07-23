import genres, { toHex } from "../../constants/genres.jsx";
import { useRef } from "react";
import gsap from "gsap";
import test from "node:test";

const CarouselGenres = ({ genres, dispatch, setGenreColor}) => {
  const arrGenreCardRef = useRef([]);
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
    const genreColorHex = genres[modGenre]; // get the color
    setGenreColor(genreColorHex);
    dispatch({ type : "SET_GENRE"  , payload : genre});
  }

  function onHover(index , theGenre) {
  let hexColor = toHex(genres[theGenre]);
  hexColor = hexColor.toLowerCase();
    if(arrGenreCardRef.current[index]) {
      gsap.to(arrGenreCardRef.current[index], {
        duration : 0.4,
        y : -5,
        boxShadow : `0px 5px 10px 4px ${hexColor}` 
      })
    }
  }

  function offHover(index , theGenre) {
    let hexColor = toHex(genres[theGenre]);
    hexColor = hexColor.toLowerCase();
    if(arrGenreCardRef.current[index]) {
      gsap.to(arrGenreCardRef.current[index], {
        duration : 0.4,
        y : 0,
        boxShadow : `0px 0px 0px 0px ${hexColor}` 
      })
    }
  }

  return myCapitalizedGenres.map((genre, index) => {
    let theGenre = ''
    let lowerCasedGenre = ''
    if(Array.isArray(genre)) {
      let joinedArrayGenre = genre.join(' ');
      lowerCasedGenre = joinedArrayGenre.toLowerCase();
      theGenre = genre[0]
    } else {
      theGenre = genre
      lowerCasedGenre = theGenre.toLowerCase()
    }
    

    return (
    <div 
    className={`genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer p-0.5 text-[13px] text-center flex justify-center items-center`}
    onClick={() => genreClick(genre)}
    ref={(el) => (arrGenreCardRef.current[index] = el)}
    onMouseEnter={() => onHover(index , lowerCasedGenre)}
    onMouseLeave={() => offHover(index , lowerCasedGenre)}
    >
      {theGenre}
    </div>
    )
  })
}

export default CarouselGenres;
