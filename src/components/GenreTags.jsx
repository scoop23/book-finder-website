import React from 'react'

const genresTags = {
    "fiction" : "bg-green-400",
    "romance" : "bg-red-400",
    "science" : "bg-violet-400",
    "history" : "bg-yellow-400",
    "adventure stories" : "bg-pink-600",
    "social science" : "bg-violet-600", 
    "religion" : "bg-primary-richgold",
    "mythology" : "bg-primary-dessertsand",
    "philosophy" : "bg-gray-500",
    "artists' books" : "bg-pink-400",
    "children's encyclopedias and dictionaries" : "bg-yellow-800",
    "comics & graphic novels" : "bg-primary-liver",
    "unknown genre" : "bg-gray-300",
    "games & activities" : "bg-primary-goldenbrown",
    "biography & autobiography" : "bg-violet-700",
    "juvenile fiction" : "bg-red-300",
    "readers" : "bg-[#1c62c9]",
    "sand dunes" : "bg-[#78d12a]",
    "mathematics" : "bg-[#de218c]",
    "family & relationships" : "bg-[#de7c21]",
    "technology & engineering" : "bg-[#ed7802]",
    "drama" : "bg-[#9ae346]" ,
    "business & economics" : "bg-[#ccf516]",
    "performing arts" : "bg-[#186dd6]",
    "juvenile nonfiction" : "bg-[#b61dd1]",
    "demonology" : "bg-[#d10a4d]",
    "russian fiction" : "bg-[#a6db1f]"
  }
  
const GenreTags = ({ genre }) => { // genre is an array of subjects/genre
  const genreArray = Array.isArray(genre) ? genre : typeof(genre) === 'string' ? [genre] : []
  
  /* we check first if its an array then if true return the genre of which we assume as an array, then if not check the type of genre if its a string then convert it to an array else not return an array */
  return (
    <div className='flex gap-2'>
      {
        genreArray.length > 0 ? (
          genreArray.map((genreName , index) => {
          const lowerCasedGenre = genreName?.toLowerCase();
          const tagStyle = genresTags[lowerCasedGenre] || "bg-gray-400";
          return (
            <div key={index} className={`${lowerCasedGenre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] font-satoshi max-h-[90px] shadow-custom4-first-content text-center max-w-[130px]`}>
              {genreName}
            </div>
          )
        })) : (
          <div className={`unkown-tag bg-gray-400 rounded-2xl p-2 text-[12px] font-satoshi max-h-[90px] shadow-custom4-first-content text-center w-[130px]`}>
            Unknown Genre
          </div>
        )
      }
    </div>
  );
};


export default GenreTags