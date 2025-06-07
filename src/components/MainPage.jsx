import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Carousel from './Carousel';


const MainPage = () => {
  

  return (
    <div className='main-page-outer-wrapper flex flex-col gap-4'>

      <div className='search-footer flex px-45 gap-2 text-white'>
        {/* <span className='p-[20px] font-avenir'>Welcome</span>
        <span className='p-[20px] font-avenir'>User</span> */}
      </div>

      <div className='main-page-wrapper max-w-[1280px] h-[800px] flex justify-center'>
        <div className='main-page flex max-w-[1600px] flex-col gap-8'>

          <div className='inner-main-page flex flex-row max-w-[1300px] gap-4'>
            <div className='card shadow-2xl border-primary-dutch-white max-w-[480px] h-[400px] rounded-[10px] border-1 grow-0'>
              <Carousel />
            </div>
            <div className='card shadow-2xl border-primary-dutch-white min-w-[480px] h-[400px] rounded-[10px] border-1 grow'>
            </div>
          </div>

          <div className='inner-main-page flex flex-row max-w-[1300px] gap-4'>
            <div className='card shadow-2xl border-primary-dutch-white border-1  min-w-[600px] h-[300px] rounded-[10px] grow'>
            </div>
            <div className='card shadow-2xl border-primary-dutch-white border-1  w-[600px] h-[300px] rounded-[10px] grow-0'>
            </div>
            <div className='card shadow-2xl border-primary-dutch-white border-1  w-[600px] h-[300px] rounded-[10px] grow-0'>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MainPage