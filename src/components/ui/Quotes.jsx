import React from "react";

const Quotes = () => {
  // get quotes from an api
  // display quotes from famous authors

  return (
    <div className="quotes-main flex w-full h-full">
      <div className="quotes-wrapper flex justify-center items-center w-full">
        <div className="quotes-inner bg-zinc-900 w-[560px] h-[250px] rounded-2xl border-1 border-zinc-600 flex gap-2">
          <div className="flex items-center justify-center gap-5 w-full">
            
            <div className="the-quote text-zinc-400 font-fasthin text-[25px] font-semibold line-clamp-3 p-2 max-w-[320px]">
              "Simplicity is the ultimate sophistication"
            </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <img src="../public/pictures/leonardo.jpg" className="w-[150px] rounded-2xl"/>
            <span className="author-name font-satoshi text-zinc-400 cursor-pointer" draggable={false} >Leonardo Da Vinci</span>
          </div>
            

          </div>
          <img src="" />
          
        </div>
      </div>
    </div>
  );
};

export default Quotes;
