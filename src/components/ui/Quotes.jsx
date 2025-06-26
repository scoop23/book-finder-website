import React from "react";

const Quotes = () => {
  // get quotes from an api
  // display quotes from famous authors

  return (
    <div className="quotes-main flex w-full h-full">
      <div className="quotes-wrapper flex justify-center items-center w-full">
        <div className="quotes-inner bg-zinc-900 w-[560px] h-[250px] rounded-2xl border-1 border-zinc-600 flex gap-2">
          <div className="flex flex-col">
            
            <div className="the-quote text-zinc-400 font-monday text-2xl">
              Simplicity is the ultimate sophistication
              Monday Feelings
            </div>

          </div>
          <img src="" />
          
        </div>
      </div>
    </div>
  );
};

export default Quotes;
