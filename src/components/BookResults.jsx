import React from 'react'





const BookResults = ({ data }) => {

  if(data.items) {
    console.log(data.items[0])
  }
  
  return (
    <div className='main-bar flex gap-10'>
      <div className='sidebar p-3 font-inter text-[100px] w-[645px] h-[420px] text-white bg-primary-dutch-white rounded-2xl'>
        
      </div>
      
      <div className='right-main-sidebar flex flex-col gap-5'>
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl'>
          
        </div>
        <div className='right-sidebar p-3 font-inter text-[100px] w-[500px] h-[200px] text-white bg-primary-dutch-white rounded-2xl'>
      </div>
      </div>
    </div>
  )
}

export default BookResults;