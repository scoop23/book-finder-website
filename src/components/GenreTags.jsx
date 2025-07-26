import React from 'react'
import genres from '../../../shared/constants/genres.json';
import { toHex } from '../../../shared/constants/genres';

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
          const styleHex = toHex(tagStyle) || "#808080";
          
          return (
            <div key={index} className={`${lowerCasedGenre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] font-satoshi max-h-[40px] shadow-custom4-first-content text-center max-w-[150px] flex items-center`} style={{
              backgroundColor : `${styleHex}`
            }}>
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