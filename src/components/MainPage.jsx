import { use, useEffect } from 'react';
import { useState } from 'react'
import CarouselA from '../components/carousels/CarouselA';
import CarouselB from '../components/carousels/CarouselB';
import Quotes from './ui/Quotes';
import Loading from './Loading';
import SurpriseMe from './SurpriseMe';


const MainPage = ({ data , quoteData }) => {

 
  return (
    <div className='main-page-outer-wrapper flex flex-col gap-4'>

      <div className='search-footer flex px-45 gap-2 text-white'>
        {/* <span className='p-[20px] font-avenir'>Welcome</span>
        <span className='p-[20px] font-avenir'>User</span> */}
      </div>

      <div className='main-page-wrapper max-w-[1380px] h-[800px] flex justify-center'>
        <div className='main-page flex max-w-[1200px] flex-col gap-8'>

          <div className='inner-main-page flex flex-row max-w-[1300px] gap-4 items-center'>
            <div className='card shadow-2xl border-zinc-400 min-w-[500px] h-[400px] rounded-[10px] border-1 grow-0 bg-primary-blackrock'>
              <CarouselA />
            </div>
            <div className='card shadow-2xl border-zinc-400 max-w-[685px] h-[400px] rounded-[10px] border-1 grow bg-primary-blackrock'>
              <CarouselB />
            </div>
          </div>

          <div className='inner-main-page flex flex-row max-w-[1300px] gap-4 items-center'>
            <div className='card shadow-2xl border-zinc-400 border-1  min-w-[600px] h-[300px] rounded-[10px] grow bg-primary-blackrock'>
              <Quotes quoteData={quoteData}/>
            </div>
            <div className='card shadow-2xl border-zinc-400 border-1  w-[600px] h-[300px] rounded-[10px] grow-0 bg-primary-blackrock'>
              <SurpriseMe />
            </div>
            <div className='card shadow-2xl border-zinc-400 border-1  w-[600px] h-[300px] rounded-[10px] grow-0 bg-primary-blackrock'>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MainPage