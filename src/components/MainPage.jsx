import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'


const MainPage = () => {
  

  return (
    <div className='main-page flex max-w-[1600px] flex-col gap-8'>
        Main Page 

      <div className='inner-main-page flex flex-row max-w-[1600px] gap-4'>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow-0'>
          
        </div>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow-0'>
          
        </div>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow'>
          
        </div>
      </div>

      <div className='inner-main-page flex flex-row max-w-[1600px] gap-4'>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow'>
          
        </div>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow-0'>
          
        </div>
        <div className='card shadow-2xl bg-amber-50 w-100 h-50 rounded-[10px] grow-0'>
          
        </div>
      </div>
      
    </div>
  )
}

export default MainPage