import React from 'react'

const GenreTags = ({ genre }) => {

  const genresTags = {
    "Fiction" : "bg-green-400",
    "FICTION" : "bg-green-400",
    "Romance" : "bg-red-400",
    "Science" : "bg-violet-400",
    "History" : "bg-beige-400",
    "Adventure stories" : "bg-pink-600"
  }

  const tagStyle = genresTags[genre] || "bg-gray-400";

  return (
    <div className={`${genre}-tag ${tagStyle} rounded-2xl p-2 text-[12px] shadow-2xl font-satoshi`}>
      {genre}
    </div>
  )
}

export default GenreTags