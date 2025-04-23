import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';

const RightSideBar = ({ topTwoBook , topThreeBook }) => {

  const book2VolumeInfo = topTwoBook?.volumeInfo;
  const title2 = book2VolumeInfo?.title;
  const bookDescription2 = book2VolumeInfo?.description || 'NA';
  const author2 = book2VolumeInfo?.authors?.[0] || 'Unknown Author';
  const imglink2 = book2VolumeInfo?.imageLinks?.thumbnail || book2VolumeInfo?.imageLinks?.smallThumbnail;
  // console.log(bookDescription2)

  const book3VolumeInfo = topThreeBook?.volumeInfo;
  const title3 = book3VolumeInfo?.title;
  const bookDescription3 = book3VolumeInfo?.description || 'NA';
  const author3 = book3VolumeInfo?.authors?.[0] || 'NA';
  const imglink3 = book3VolumeInfo?.imagelinks?.thumbnail || book3VolumeInfo?.imageLinks?.smallThumbnail;

  const Book2Info = () => {
    return (
      <div className='content-info2 flex flex-col gap-2 min-w-[430px] max-h-[220px] items-baseline'>
          <span className='title2 max-h-[200px] text-[20px] p-2 flex flex-col gap-2'>{title2}
            <span className='text-[13px] block '>by {author2}</span> 
          </span>
          
          <div className='description2 text-[15px] p-2  rounded-2xl max-h-[115px] font-winky overflow-hidden '>
            {bookDescription2}
          </div>
      </div>
    )
  }

  const Book3Info = () => {
    return(
      <div className='content-info3 flex flex-col gap-2 min-w-[430px] max-h-[220px] items-baseline'>
          <span className='title3 max-h-[200px] text-[20px] p-2 flex flex-col gap-2'>{title3}
            <span className='text-[13px] block '>by {author3}</span> 
          </span>
          
          <div className='description3 text-[15px] p-2  rounded-2xl max-h-[115px] font-winky overflow-hidden '>
            {bookDescription3}
          </div>
      </div>
    )
  }

  return (
    <div className='right-main-sidebar flex flex-col gap-5 '>
        <div className='right-sidebar text-black p-6 font-inter text-[100px] w-[700px] h-[200px] bg-primary-dutch-white rounded-2xl flex gap-2'>
        <div className='pic-div-b2 max-h-[220px] justify-center flex'>
          <img src={`${imglink2}`} alt=""  className='min-w-[100px] rounded-2xl ring-1'/>
        </div>
          <Book2Info />
        </div>

        <div className='right-sidebar p-6 font-inter text-[100px] w-[700px] h-[200px] text-black bg-primary-dutch-white flex rounded-2xl gap-2'>
        <img src={`${imglink3}`} alt=""  className='justify-center flex min-w-[100px] rounded-2xl ring-1 pic-div-b3 max-h-[200px]'/>
          <Book3Info />
        </div>

    </div>
  );
}

const LeftSideBar = ({ topOneBook }) => {

  // const { title } = topOneBook.volumeInfo;
  const title = topOneBook?.volumeInfo?.title;
  const imglink = topOneBook?.volumeInfo?.imageLinks?.thumbnail;
  const bookDescription = topOneBook?.volumeInfo?.description;
  const author = topOneBook?.volumeInfo?.authors?.[0] || 'No Author';


  const Infos = () => {
    return(
      <div className='content-info flex flex-col gap-2 max-w-[430px] max-h-[220px] items-baseline'>
          <span className='title text-[20px] p-2 flex flex-col gap-2'>{title}
            <span className='text-[13px] block '>by {author}</span> 
          </span>
          
          <div className='description text-[15px] p-2  rounded-2xl max-h-[220px] font-winky overflow-hidden '>
            {bookDescription}
          </div>
      </div>
    )
  }

  return (
    <div className='sidebar p-3 font-inter text-2xl max-w-[900px] max-h-[420px] text-black bg-primary-dutch-white rounded-2xl'>
      <div className='main-content-div flex justify-center gap-4 p-4 min-h-[400px]'>
        <div className='pic-div max-h-[220px] justify-center flex'>
          <img src={`${imglink}`} alt="book cover"  className='min-w-[140px] rounded-2xl ring-1'/>
        </div>
        <Infos />
      </div>
    </div>
  )
}

const BookResults = ({ data }) => { 
  const topBooks = data.items?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = topBooks?.[0];
  const topTwoBook = topBooks?.[1];
  const topThreeBook = topBooks?.[2];
  const remainingBooks = data.items?.slice(3) || []; // start at index 4

  return (
    <div className='main-content text-black flex flex-col gap-6 items-center'>
      <div className='main-bar flex gap-8 min-w-full items-center justify-center'>
        <LeftSideBar topOneBook={topOneBook}/>
        <RightSideBar topTwoBook={topTwoBook} topThreeBook={topThreeBook}/>
        
      </div>
      <button className='page-btn border max-w-[100px] p-2 rounded-2xl cursor-pointer hover:bg-gray-500 transition-all duration-250'>PAGE {}</button>
      <BookResultsGrid remainingBooks={remainingBooks} />
    </div>
  );
}

export default BookResults;