import React, { useEffect } from 'react'

const RightSideBar = () => {
  return (
    <div className='right-main-sidebar flex flex-col gap-5'>
      {}
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl inset-shadow-all inset-shadow-primary-goldenbrown'>
          
        </div>
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl inset-shadow-all inset-shadow-primary-goldenbrown'>
          
        </div>
    </div>
  );
}

const LeftSideBar = ({ topOneBook }) => {

  // const { title } = topOneBook.volumeInfo;
  const title = topOneBook?.volumeInfo?.title;
  const imglink = topOneBook?.volumeInfo?.imageLinks?.thumbnail;
  const bookDescription = topOneBook?.volumeInfo?.description;
  let hey = '';
  const Infos = () => {
    return(
      <div className='content-info flex flex-col gap-2 '>
          <span className='title'>{title}</span>
          <div className='description text-[10px] p-2 bg-primary-graychateau rounded-2xl max-h-[100px] overflow-hidden '>
            {bookDescription}
          </div>
      </div>
    )
  }

  return (
    <div className='sidebar p-3 font-inter text-2xl w-[645px] h-[420px] text-black bg-primary-dutch-white rounded-2xl inset-shadow-all inset-shadow-primary-goldenbrown'>
      <div className='main-content-div flex gap-4 p-8 min-h-[400px]'>
        <div className='pic-div'>
          <img src={`${imglink}`} alt="book cover"  className='min-w-[120px]'/>
        </div>
        <Infos />
      </div>
    </div>
  )
}

const BookResults = ({ data }) => {
  let topBooks;
  let topOneBook;
  
  if(data.items) {
    topBooks = data.items.filter(element => element.volumeInfo.averageRating >= 3).slice(0,3)
    topOneBook = topBooks[0];
  }


  return (
    <div className='main-bar flex gap-8  min-w-full'>
      <LeftSideBar topOneBook={topOneBook}/>
      <RightSideBar />
    </div>
  );
}

export default BookResults;