import React from 'react'

const genresTags = {
    "fiction" : "bg-green-400",
    "romance" : "bg-red-400",
    "science" : "bg-violet-400",
    "history" : "bg-yellow-400",
    "adventure stories" : "bg-pink-600",
    "social science" : "bg-violet-600",
    "religion" : "bg-primary-richgold",
    "mythology" : "bg-primary-dessertsand"
  }
  
const GenreTags = ({ genre }) => {

  const lowerCasedGenre = genre?.toLowerCase()

  const tagStyle = genresTags[lowerCasedGenre] || "bg-gray-400";

  return (
    <div className={`${genre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] font-satoshi max-h-[32px] shadow-custom4-first-content`}>
      {genre}
    </div>
  )
}

export default GenreTags