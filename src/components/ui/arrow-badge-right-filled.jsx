import React, { forwardRef } from 'react'

const TablerArrowBadgeRightFilled = forwardRef((props , ref) => {
  return (
    <svg
    ref={ref}
    width="1.275em" 
    height="1.275em" 
    viewBox="0 0 24 24" 
    {...props}>
    {/* Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE */}
    <path fill="#888888" 
    d="m7 6l-.112.006a1 1 0 0 0-.669 1.619L9.72 12l-3.5 4.375A1 1 0 0 0 7 18h6a1 1 0 0 0 .78-.375l4-5a1 1 0 0 0 0-1.25l-4-5A1 1 0 0 0 13 6z" />
    </svg>
  )
})
export default TablerArrowBadgeRightFilled;