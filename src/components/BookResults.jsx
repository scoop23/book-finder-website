import React from 'react'

const RightSideBar = () => {
  return (
    <div className='right-main-sidebar flex flex-col gap-5'>
      {}
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl'>
          
        </div>
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl'>
          
        </div>
    </div>
  );
}

const LeftSideBar = ({ topOneBook }) => {

  // const { title } = topOneBook.volumeInfo;

  if(topOneBook) {
    const { title } = topOneBook.volumeInfo;
    console.log(title)
  }

  return (
    <div className='sidebar p-3 font-inter text-[100px] w-[645px] h-[420px] text-white bg-primary-dutch-white rounded-2xl'>
      
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
    <div className='main-bar flex gap-12 min-w-full'>
      <LeftSideBar topOneBook={topOneBook}/>
      <RightSideBar />
    </div>
  );
}

export default BookResults;