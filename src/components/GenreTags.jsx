import React from 'react'
import genres from '../constants/genres.jsx'

const GenreTags = ({ genre }) => { // genre is an array of subjects/genre
  const genreArray = Array.isArray(genre) ? genre : typeof(genre) === 'string' ? [genre] : []
  /* we check first if its an array then if true return the genre of which we assume as an array, then if not check the type of genre if its a string then convert it to an array else not return an array */
  return (
    <div className='flex gap-2'>
      {
        genreArray.length > 0 ? (
          genreArray.map((genreName , index) => {
          const lowerCasedGenre = genreName?.toLowerCase();
          const tagStyle = genres[lowerCasedGenre] || "bg-gray-400";

          return (
            <div key={index} className={`${lowerCasedGenre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] font-satoshi max-h-[40px] shadow-custom4-first-content text-center max-w-[130px] flex items-center`}>
              {genreName}
            </div>
          )
        })) : (
          <div className={`unkown-tag bg-[#bfbfbf] rounded-2xl p-2 text-[12px] font-satoshi max-h-[36px] shadow-custom4-first-content text-center w-[130px]`}>
            Unknown Genre
          </div>
        )
      }
    </div>
  );
};


export default GenreTags;