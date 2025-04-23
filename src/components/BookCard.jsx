import React from 'react'

const BookCard = ({ bookData }) => {

  // console.log(bookData?.volumeInfo?.title);
  const data = bookData.volumeInfo;
  // console.log(data.imageLinks);
  const { title, imageLinks } = data;
  console.log(imageLinks.thumbnail)

  return (
    <div className='main-bookcard-content'>
      <div className='content-container rounded-3xl bg-primary-dutch-white max-w-[309px] min-h-[300px]'>
        {/* TODO : ADD CONTENT FOR CARD */}
        <div className='content flex p-5'>
          <div className='inner-content flex gap-2'>
            <img src={`${imageLinks.thumbnail}`} />
            <span>{title}</span>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default BookCard;