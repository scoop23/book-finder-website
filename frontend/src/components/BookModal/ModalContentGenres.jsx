const ModalContentGenres = ({ genresData }) => {
  if (!genresData) {
    return (
      <button className="border-2 border-red-500 ">No genres available.</button>
    )
  }


  if (genresData.length > 6) {
    console.log(genresData);
    return genresData?.slice(0, 5).map((sub, i) => (
      <button className="genre-btn bg-gray-600 p-2 text-white" key={i}>{sub}</button>
    ))
  } else {
    return genresData?.map((sub, i) => (
      <button className="genre-btn bg-gray-600 p-2 text-white" key={i}>{sub}</button>
    ))
  }

}

export default ModalContentGenres;
