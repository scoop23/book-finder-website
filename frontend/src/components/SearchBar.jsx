import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaSearch , FaHome } from 'react-icons/fa';
import { animate } from 'motion';
import  SearchAuthor  from './SearchAuthor.jsx'
import { BookSearchContext } from '../context/BookSearchContext.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import SearchPagePaginationResults from './SearchPagePaginationResults.jsx';
import gsap from 'gsap';


const SearchBar = () => {  
  const { state , dispatch } = useContext(BookSearchContext); // get the context
  const navigate = useNavigate();
  const location = useLocation();
  const [clickedSearchTitle, setClickedSearchTitle] = useState(false);
  const [clickedSearchAuthor, setClickedSearchAuthor] = useState(false);
  const searchAuthor = useRef()
  const searchTitle = useRef();
  const searchAuthorbButtonRef = useRef()
  const [searchCategory , setSearchCategory] = useState('');
  const searchAuthorRefs = useRef(null);
  const [localSearchText , setLocalSearchText] = useState(() => {
    return localStorage.getItem("searchText") || state.searchText;
  })

  const bothClicked = clickedSearchAuthor && clickedSearchTitle;

  useEffect(() => {
    if(searchAuthorRefs.current) {
      const {searchAuthorButtonRef} = searchAuthorRefs.current;
      // ANIMATE THE INPUT FOR THE AUTHOR AFTER AUTHOR SEARCH BUTTON DISAPPEARS
      console.log(bothClicked)
      if(searchAuthorRefs.current && bothClicked) {
        gsap.fromTo(searchAuthorButtonRef, {
          opacity : 0,
          width : 174.41,
          duration : 0.8,
        }, {
          opacity : 1,
          width : 300,
          duration : 0.8,
        })
      }
    }
  }, [bothClicked]);


  useEffect(() => {
    localStorage.setItem("searchText" , localSearchText);
    dispatch({ type : "SET_SEARCH_TEXT" , payload : localSearchText })
  }, [localSearchText , dispatch])

  const { 
    searchType 
  } = state; // get the state destructuring

  function handleClickSearch() {
    const input = document.querySelector('.input-search');
  
    if(input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.classList.add('inline-block');
     
      animate(input, { width: ['0px','200px'], duration: 0.5 });
    } else {
      animate(input, { width: ['200px', '0px'] , duration: 0.5 }).finished.then(() => { // can also be used as a promise
        input.classList.remove('inline-block');
        input.classList.add('hidden');
      })
    }
  }

  useEffect(() => {
    if (searchType.includes("author")) {
      setClickedSearchAuthor(true);
      setSearchCategory('author')
    } else {
      setClickedSearchAuthor(false);
    }

    if (searchType.includes("title")) {
      setClickedSearchTitle(true);
      setSearchCategory('title')
    } else {
      setClickedSearchTitle(false);
    }

    if(searchType.includes("title") && searchType.includes("author")) {
      setSearchCategory("title-author")
    }

  }, [searchType]);


  function buttonSearchTitle() {
    const element = searchTitle.current;

    if (!element) {
      console.error("Element does not exist.");
      return;
    }

    if (!clickedSearchTitle) {
      dispatch({ type : 'SET_SEARCH_TYPE', payload : {index : 0, value : 'title'}});
      setClickedSearchTitle(true);
      
      element.classList.remove("hover:bg-amber-50", "hover:text-black");
      element.classList.add("bg-amber-50", "text-black", "hover:bg-primary-ebony-clay", "hover:text-amber-100");

    } else {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 0, value: null } });

      setClickedSearchTitle(false)
      // TODO: move this to the classname with toggler 'active'
      element.classList.remove("bg-amber-50","text-black", "hover:bg-primary-ebony-clay", "hover:bg-amber-50");
      element.classList.add("hover:bg-amber-50" , "hover:text-black");
    }
  }

  function buttonSearchAuthor() {
    const element = searchAuthor.current
    
    if(!element) {
      console.log("No ", element)
    }
    console.log(clickedSearchAuthor)
    console.log(clickedSearchTitle)


    if(!clickedSearchAuthor) {
      if(clickedSearchTitle) {
        gsap.to(searchAuthor.current, {
          opacity : 0,
          duration : 0.2,
          onComplete : () => {
            setTimeout(() => {
              dispatch({ type : 'SET_SEARCH_TYPE', payload : { index : 1 , value : "author"} })
              setClickedSearchAuthor(true);
            }, 200);
          }
        })
      } else {
        dispatch({ type : 'SET_SEARCH_TYPE', payload : { index : 1, value : "author"} })
        setClickedSearchAuthor(true); 
      }
      
    } else {
      dispatch({ type : 'SET_SEARCH_TYPE', payload : { index : 1, value : null} })
      setClickedSearchAuthor(false); 
    }
    
  }

  function onSubmitSearch(e) {
    if(e.key === 'Enter'){
      dispatch({ type : "SET_SEARCH_TEXT" , payload : e.target.value });
      setLocalSearchText(e.target.value)
      if(!state.searchType){
        console.log("\n Pick a searchType \n");
        return;
      }

      if(e.target.value.trim() && (state.searchType.includes("title") || state.searchType.includes("author"))){
        switch(searchCategory) {
          case 'title' : {
            navigate(`/search/title?query=${encodeURIComponent(e.target.value)}&page=1`);
            break;
          }
          case 'author' : {
            navigate(`/search/author?query=${encodeURIComponent(e.target.value)}&page=1`);
            dispatch({ type : "SET_AUTHOR_TEXT", payload : e.target.value });
            break;
          }
          case 'title-author' : {
            if(!state.author) {
              console.error("Please Input an Author.");
              return;
            }
            console.log(state.author);  
            navigate(`/search/title-author?p1=${encodeURIComponent(e.target.value)}&p2=${state.author}&page=1`);
            break;
          }
          default : 'title'  
        }
      }
    }
  }

  const isMainPage = location.pathname === '/search'; // is location is /search then return true

  return (
    <div className='search-bar-wrapper flex flex-col font-inter'>

      <div className='outer-search-bar-container p-[20px] max-w-full min-h-[20px] flex justify-between gap-2 '>
        <button className='home-button flex flex-row gap-2 items-center rounded-4xl p-8 border-1 h-[70px] text-amber-100 hover:text-black hover:bg-amber-50 duration-250 transition-all cursor-pointer' onClick={() => {
          navigate('/search')
        }}><FaHome /></button>
        <div className='flex gap-2 buttons-wrapper'>
          
          
          {!isMainPage ? (
            <SearchPagePaginationResults totalPages={state.bookData?.totalItems} />
          )
           : '' // if location is /search then !isMainPage will be false, SearchPagePaginationResults will only render if its not /search
          } 

          <button className='search-title hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] cursor-pointer hover:shadow-lg hover:text-black text-amber-100'
          onClick={() => buttonSearchTitle()} ref={searchTitle}>Title Search</button>
          
          {!(searchType.includes("title") && searchType.includes("author")) &&
            // opposite of when author and title search are active
            <> 
              <button className={`${ clickedSearchAuthor ? 'hover:bg-primary-ebony-clay text-black bg-amber-50 hover:text-amber-100' : 'hover:bg-amber-50 hover:text-black text-amber-100'} search-author duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] cursor-pointer hover:shadow-lg `}
              onClick={() => buttonSearchAuthor()} ref={searchAuthor}>Author Search</button> 
            </>
          }
          
          {searchType.includes("author") && searchType.includes("title")
            && // if it includes 2 searchtypes in the searchType array it will initiate search by title and author
            (<SearchAuthor dispatch={dispatch} setClickedSearchAuthor={setClickedSearchAuthor} ref={searchAuthorRefs}/>) // pass in the states for it to works
          }

            <div className='inner-search flex flex-row gap-2 items-center rounded-4xl p-4 bg-amber-50 h-[70px] justify-center'>
              <input
              required
              className={`input-search hidden w-0 rounded-2xl outline-0 font-inter`}
              type="text"
              defaultValue={localSearchText}
              onKeyDown={(e) => {
                  if(state.searchType[0] === null && state.searchType[1] === null) {
                    alert("SearchType needs to be toggled")
                  } else {
                    onSubmitSearch(e);
                  }
                  console.log(state.searchType)
                  console.log("Input something")
                }
              }
              placeholder={`${searchType.includes("author") && searchType.includes("title") ? "Search Title of Book.. " : "Author/Title a Book.. "}`}
              /> 
              <div className='click-search w-[40] h-[40] p-2 cursor-pointer' onClick={() => handleClickSearch()}>
                <FaSearch />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SearchBar;