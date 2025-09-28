import React from 'react'
import ActionButtons from '../../components/ActionButtons'

const DemoPage = () => {
  return (
    <div className='w-screen h-screen bg-amber-50'>
      <div className='demo-sidebar w-[400px] h-[400px] bg-amber-300 p-10 '>
        <ActionButtons /> 
      </div>
    </div>
  )
}

export default DemoPage