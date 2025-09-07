import { forwardRef } from "react"


const Pagination = ({className, ...props}) => (// Main Parent
  <nav
    className={`mx-auto flex justify-center w-full ${className || ' '}`}
    role="navigation"
    aria-label="pagination"
    {...props}
  />
) 

const PaginationContent = forwardRef(({className , ...props}, ref) => (
  <ul
  className={`flex flex-row items-center gap-1 ${className || ''}`}
  ref={ref}
  {...props}
  />
))

const PageLink = forwardRef(({className , ...props} , ref) => (
  <li
  className={`cursor-pointer ${className || ''}`}
  {...props}
  ref={ref}
  />
))


export {
  Pagination,
  PaginationContent,
  PageLink
} 