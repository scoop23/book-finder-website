import React from 'react'

const BookCard = ({ bookData }) => {

  // console.log(bookData?.volumeInfo?.title);
  const data = bookData.volumeInfo;
  const { title, imageLinks } = data;

  return (
    <div className='main-bookcard-content'>
      <div className='content-container rounded-3xl bg-primary-dutch-white max-w-[309px] min-h-[300px]'>
        {/* TODO : ADD CONTENT FOR CARD */}
        <div className='main-content-card flex p-5 max-h-[150px]'>
          <div className='inner-content flex gap-2'>
            <div className='content flex gap-5'>
              <img className='rounded-2xl ' src={`${imageLinks.thumbnail || 'No Image'}`} />
              <span>{title}</span>
            </div>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default BookCard;