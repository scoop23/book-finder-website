import React, { forwardRef, useEffect, useRef, useMemo } from 'react';
import { useState } from 'react';
import bookImage from '../assets/book_empty.png';
import ActionButtons from './ActionButtons/ActionButtons';
import { fetchWorks } from '../api/AccessToApi';
import { useQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import BookCardModal from './BookCardModal';
import DivActionButton from './ActionButtons/DivActionButton';

const BookCard = forwardRef(({ isBookModal, setIsBookModal, bookData, OnHover, onSelect }, ref) => {
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
    staleTime: 5 * 60 * 1000,
  });


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

  const description = useMemo(() => {
    if (!workData.data) return;

    const raw = workData.data.description;
    if (typeof raw === "string") return getDescription(raw);
    if (typeof raw === "object") return getDescription(raw.value);
  }, [workData.data])


  function hoverSeeMoreButton() {

  }

  function handleCardClick() {
    // setIsModal(!isModal)
    setIsBookModal(!isBookModal);
    if (typeof onSelect === "function") onSelect();
  }


  // console.log(workData)


  const mockWorkData = {
    title: "Harry Potter and the Goblet of Fire",
    description: "The fourth book in the Harry Potter franchise...",
    covers: [12059372],
    subjects: ["Fantasy", "Magic", "School"],
    authors: [{ author: { key: "/authors/OL23919A" } }]
  }

  // console.log(isModal)

  return (
    <div
      tabIndex={isBookModal ? -1 : 0}
      role="button"
      className="main-bookcard-content max-h-[300px] font-inter select-auto cursor-pointer relative"
      ref={ref}
      onClick={() => handleCardClick()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      onMouseEnter={OnHover}
      style={{ pointerEvents: !isBookModal ? "auto" : "none" }}
    >
      {/* { */}
      {/*   <BookCardModal */}
      {/*     workData={workData.data} */}
      {/*     isModal={isModal} */}
      {/*     setIsModal={handleCardClick} */}
      {/*     isLoading={workData.isPending} */}
      {/*     isError={workData.isError} */}
      {/*     refetch={workData.refetch} */}
      {/*   /> */}
      {/* } */}

      {/* goo layer */}
      <ActionButtons Ypos={-81.5} Xpos={17.5} hover={isHovering} sideBarRef={contentRef} className={``} />
      <DivActionButton />

      <div style={{
        // boxShadow: 'inset 0 1px 3px #ffffff30, 0 2px 4px #00000030, 0 2px 5px #00000015'
        // background: "#191920"
        // background: "linear-gradient(308deg,rgba(39, 39, 51, 1) 0%, rgba(25, 25, 32, 1) 75%)",
      }} className="content-container rounded-2xl  max-w-[309px] h-[300px] flex flex-col transition-all z-10 bg-transparent"
        ref={contentRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="bookcard-content flex flex-col py-4 p-3 gap-2 max-h-full">
          <div className="main-content-card flex gap-2">
            <div className="flex-shrink-0">
              <img
                className="rounded-2xl border w-[80px] h-[110px] object-cover"
                src={workData?.data?.covers?.length ? `https://covers.openlibrary.org/b/id/${workData.data.covers[0]}-L.jpg` : bookImage}
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
          }} className="sub-content w-full h-[110px] bg-opacity-40 rounded-2xl p-2 overflow-hidden">
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
