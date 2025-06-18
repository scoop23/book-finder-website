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
    "sand dunes" : "bg-[#78d12a]"
  }
  
const GenreTags = ({ genre }) => {

  const lowerCasedGenre = genre?.toLowerCase()

  const tagStyle = genresTags[lowerCasedGenre] || "bg-gray-400";

  if(!genre) return "Unknown Genre"

  return (
    <div className={`${genre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] font-satoshi max-h-[90px] shadow-custom4-first-content text-center`}>
      {genre}
    </div>
  )
}

export default GenreTags