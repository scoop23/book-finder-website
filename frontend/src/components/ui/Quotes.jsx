import React, { useEffect, useState } from "react";
import LoadingQuotes from "../LoadingQuotes";

const Quotes = ({ quoteData }) => {
  // get quotes from an api
  // display quotes from famous authors
  // if(quoteData) {
  //   console.log(quoteData[0])
  // } else {
  //   console.log("Not exist yet")
  // }
  const [quote , setQuote] = useState(null);

  useEffect(() => {
  if (quoteData) {
      setQuote(quoteData[0]); // one quote object
    }
  }, [quoteData]);

  if (!quote) return <LoadingQuotes />;
  const { q, a } = quote;


  return quote && (
    <div className="quotes-main flex w-full h-full">
      <div className="quotes-wrapper flex justify-center items-center w-full">
        <div className="quotes-inner bg-zinc-900 w-[565px] h-[265px] rounded-2xl border-1 border-zinc-600 flex gap-2">

        {/* make this carouselLike */}
        {/* quote card */}
          <div className="quote-card flex items-center justify-center gap-5 w-full">
            <div className="the-quote text-zinc-400 font-fasthin text-[25px] font-normal line-clamp-3 p-2 max-w-[340px]">
              "{q}"
            </div>
      
            <div className="flex flex-col justify-center items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}pictures/leonardo.jpg`} className="w-[150px] rounded-2xl"/>
              {/* import.meta.env.BASE_URL gets the points to the ../public or /book-finder-website/ */}
              <span className="author-name font-satoshi text-zinc-400 cursor-pointer text-[15px]" draggable={false} >{a}</span>
            </div>
          </div>
        {/* quote card */}
        
        </div>
      </div>
    </div>
  );
};

export default Quotes;
