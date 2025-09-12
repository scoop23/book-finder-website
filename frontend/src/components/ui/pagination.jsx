import { forwardRef } from "react"

const Pagination = ({className, ...props}) => (// Main Parent
  <nav
    className={`mx-auto flex justify-center w-full items-center pr-5 ${className || ' '}`}
    role="navigation"
    aria-label="pagination"
    {...props}
  />
) 

const PaginationContent = forwardRef(({className , ...props}, ref) => (
  <ul
  className={`flex flex-row gap-2 items-center ${className || ''}`}
  ref={ref}
  {...props}
  />
))

const PageLink = forwardRef(({className , ...props} , ref) => (
  <li
    className={`w-10 h-10 flex items-center justify-center ${className || ''}`}
    ref={ref}
    {...props}
  />
))


export {
  Pagination,
  PaginationContent,
  PageLink
} 