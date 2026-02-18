import React, { forwardRef, useEffect, useRef } from 'react';
import { useState } from 'react';
import bookImage from '../assets/book_empty.png';
import ActionButtons from './ActionButtons/ActionButtons';
import { fetchWorks } from '../api/AccessToApi';
import { useQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import BookCardModal from './BookCardModal';

const BookCard = forwardRef(({ bookData }, ref) => {
  const [isModal, setIsModal] = useState(false);
  const data = bookData;
  // const { title, imageLinks, description, publishedDate, authors, key} = data;
  const { title, cover_edition_key, author_name, first_publish_year, key } = data;
  const [isHovering, setIsHovering] = useState(false);
  const contentRef = useRef();
  const workId = key.split("/")[2];

  const workData = useQuery({
    queryKey: ["workdata", workId],
    queryFn: () => fetchWorks(workId),
    retry: 0,
    enabled: !!workId,
    refetchOnWindowFocus: false,
    cacheTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  })

  function containsLink(tokens) {
    // recursively goes through every tokens until it finds a type of token.type === "link"
    for (const token of tokens) {
      if (token.type === "link") {
        return true;
      }

      if (token.tokens && containsLink(token.tokens)) {
        return true;
      }

      if (token.items) {
        for (const item of token.items) {
          if (item.tokens && containsLink(item.tokens)) {
            return true;
          }
        }
      }
    }
  }

  function getDescription(text) {
    const tokens = marked.lexer(text); // parsed the markdown into tokens
    const hasLink = containsLink(tokens);
    return hasLink ? "No Official Description." : text;
    // otherwise return text
  }

  let description = ''
  const rawDescription = workData.data?.description;
  if (typeof (rawDescription) === "string") {
    description = getDescription(rawDescription);
  } else if (typeof (rawDescription) === "object") {
    description = getDescription(rawDescription.value);
  }

  // console.log(workData.data);

  function hoverSeeMoreButton() {

  }

  function handleCardClick() {
    setIsModal(!isModal)
  }

  return (
    <div className="main-bookcard-content max-h-[300px] font-inter select-auto" ref={ref} onClick={() => handleCardClick()}>
      <BookCardModal workData={workData.data} isModal={isModal} />
      <div style={{
        // boxShadow: 'inset 0 1px 3px #ffffff30, 0 2px 4px #00000030, 0 2px 5px #00000015'
      }} className="content-container rounded-2xl bg-[var(--color-dark)]  max-w-[309px] h-[300px] flex flex-col transition-all relative" ref={contentRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <ActionButtons Ypos={-81.5} Xpos={17.5} hover={isHovering} sideBarRef={contentRef} className={``} />
        <div className="bookcard-content flex flex-col py-4 p-3 gap-2 max-h-full">
          <div className="main-content-card flex gap-2">
            <div className="flex-shrink-0">
              <img
                className="rounded-2xl border w-[80px] h-[110px] object-cover"
                src={cover_edition_key ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg` : bookImage}
                alt="Book"
              />
            </div>

            <div className="content-info flex flex-col justify-between text-sm w-full overflow-hidden">
              {/* will make authors a dropdown button or a hover then the user will see all the author/s */}
              <span className="title text-[var(--color-lighter)] font-bold line-clamp-2 break-words">{title}</span>
              <div className="text-xs text-white  flex flex-col">
                Authors:
                {author_name ? (
                  <div className='flex flex-col '>
                    {
                      author_name.length > 3 ? (
                        <div className='flex flex-col'>
                          {author_name.slice(0, 3).join(",")}
                          <button className='text-blue flex'>
                            <a href='#' className='text-blue-500'>
                              See More Contributors.
                            </a>
                          </button>
                        </div>
                      ) : (
                        <div>
                          {author_name.map((author, index) => (
                            <div key={index}>{author}</div>
                          ))}
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <div>
                    Unknown Author
                  </div>
                )}
              </div>
              <div className="text-xs text-white ">Published: {first_publish_year || 'N/A'}</div>
            </div>
          </div>

          {/* Description Section */}
          <div style={{
            // boxShadow: 'inset 0 1px 3px #00000030 ,inset 0 2px 4px #00000030'
          }} className="sub-content w-full h-[110px] bg-[var(--color-dark)] bg-opacity-40 rounded-2xl p-2 overflow-hidden">
            <p className=" text-xs text-[var(--color-lighter)] line-clamp-4 break-words">
              {description || 'No description available.'}
            </p>
          </div>

          {/* <button 
          className='rounded-2xl p-2 bg-[#212129] shadow-2xl cursor-pointer text-white z-20'
          ref={ref}><a href='#'>See More</a></button> */}
        </div>
      </div>
    </div>
  );
});

export default BookCard;
