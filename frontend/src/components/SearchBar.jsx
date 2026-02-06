import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { FaSearch, FaHome } from 'react-icons/fa';
import { animate } from 'motion';
import SearchAuthor from './SearchAuthor.jsx'
import { BookSearchContext } from '../context/BookSearchContext.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import SearchPagePaginationResults from './SearchPagePaginationResults.jsx';
import gsap, { Elastic } from 'gsap';
// ATTEMPT TO RESTRUCTURE THIS TO SEPERATE COMPONENTS'S
// TODO: WHEN RELOADING THE TAB GET THE PREVIOUS CLICKED SEARCH


const SearchBar = () => {
  const { state, dispatch } = useContext(BookSearchContext); // get the context
  const navigate = useNavigate();
  const location = useLocation();
  const [clickedSearchTitle, setClickedSearchTitle] = useState(() => {
    const saved = localStorage.getItem("clickedSearchTitleLocal") || false;
    return saved === "true"
  });
  // const [clickedSearchTitle, setClickedSearchTitle] = useState(false);
  const [localAuthorText, setLocalAuthorText] = useState(() => {
    return localStorage.getItem("authorText") || state.author;
  })
  const [clickedSearchAuthor, setClickedSearchAuthor] = useState(() => {
    const saved = localStorage.getItem("clickedSearchAuthorLocal") || false;
    return saved === "true"; // returns true, because localstorage only stores strings.
  });

  useEffect(() => {
    localStorage.setItem("clickedSearchTitleLocal", clickedSearchTitle);
    setClickedSearchTitle(true);
  }, [clickedSearchTitle])
  const searchAuthorBtn = useRef()
  const searchTitle = useRef();
  const [searchCategory, setSearchCategory] = useState('');
  const searchAuthorRefs = useRef(null);
  const [localSearchText, setLocalSearchText] = useState(() => {
    return localStorage.getItem("searchText") || state.searchText;
  })
  const searchBarInputRef = useRef(null);
  const bothClicked = clickedSearchAuthor && clickedSearchTitle;

  useEffect(() => {
    localStorage.setItem("searchText", localSearchText);
    dispatch({ type: "SET_SEARCH_TEXT", payload: localSearchText })
  }, [localSearchText, dispatch])


  useEffect(() => {
    localStorage.setItem('clickedSearchAuthorLocal', clickedSearchAuthor);
    setClickedSearchAuthor(true);
  }, [clickedSearchAuthor])

  useEffect(() => {
    localStorage.setItem('authorText', localAuthorText);
    dispatch({ type: "SET_SEARCH_TEXT", payload: localAuthorText })
  }, [localAuthorText, dispatch])



  const {
    searchType
  } = state; // get the state destructuring
  const helloFromContextLocal = localStorage.getItem("searchTypeLocalStorage");
  console.log(helloFromContextLocal)

  function handleClickSearch() {
    const input = document.querySelector('.input-search');

    if (input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.classList.add('inline-block');

      animate(input, { width: ['0px', '200px'], duration: 0.5 });
    } else {
      animate(input, { width: ['200px', '0px'], duration: 0.5 }).finished.then(() => { // can also be used as a promise
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
    // if state.searchType both includes the former and the latter.
    if (searchType.includes("title") && searchType.includes("author")) {
      setSearchCategory("title-author")
    }

  }, [searchType]);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    if (searchAuthorRefs.current && bothClicked) {
      const { searchAuthorButtonRef, XIconRef, searchAuthorInputRef } = searchAuthorRefs.current;

      tl.fromTo(searchAuthorButtonRef, { opacity: 0, width: 174.41 }, { opacity: 1, width: 300, duration: 0.5 })
        .fromTo(XIconRef, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .fromTo(searchAuthorInputRef, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.5");

    } else if (searchAuthorBtn.current && !bothClicked) {
      gsap.fromTo(searchAuthorBtn.current, {
        opacity: 0,
        duration: 0.3
      }, {
        opacity: 1,
        duration: 0.3,
        ease: Elastic.easeInOut.config(0.9, 0.4)
      })
      console.log(searchAuthorBtn.current, "Exists!!")
    } else {
      console.log(searchAuthorBtn.current, "doenst exist")
    }


  }, [bothClicked]);

  function buttonSearchTitle() {
    const element = searchTitle.current;

    if (!element) {
      console.error("Element does not exist.");
      return;
    }

    if (!clickedSearchTitle) {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 0, value: 'title' } });
      setClickedSearchTitle(true);
    } else {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 0, value: null } });
      setClickedSearchTitle(false)
    }
  }

  function buttonSearchAuthor() {
    const element = searchAuthorBtn.current

    if (!element) {
      console.log("No ", element)
    }

    if (!clickedSearchAuthor) { // if true then !true = false.. was it false before this click if true then invert this and make it true, then if clickedSearchTitle is also true then run this making the bothClicked true..?
      if (clickedSearchTitle) {
        const newClickedState = !clickedSearchAuthor && clickedSearchTitle;
        console.log("search btn and author btn is clicked? :: ", newClickedState)
        gsap.to(searchAuthorBtn.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setTimeout(() => {
              dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 1, value: "author" } })
              setClickedSearchAuthor(true);
            }, 500);
          }
        })
      } else {
        dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 1, value: "author" } })
        setClickedSearchAuthor(true);
      }
    } else {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 1, value: null } })
      setClickedSearchAuthor(false);
    }
  }

  function onSubmitSearch(e) {
    if (e.key === 'Enter') {
      
      dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value });
      setLocalSearchText(e.target.value)
      if (!state.searchType) {
        console.log("\n Pick a searchType \n");
        return;
      }
      console.log(searchCategory)
      if (e.target.value.trim() && (state.searchType.includes("title") || state.searchType.includes("author"))) {
        switch (searchCategory) {
          case 'title': {
            navigate(`/search/title?query=${encodeURIComponent(e.target.value)}&page=1`);
            break;
          }
          case 'author': {
            navigate(`/search/author?query=${encodeURIComponent(e.target.value)}&page=1`);
            dispatch({ type: "SET_AUTHOR_TEXT", payload: e.target.value });
            break;
          }
          case 'title-author': {
            const unofficialAuthorText = searchAuthorRefs.current.searchAuthorInputRef.value;
            console.log(unofficialAuthorText)
            dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value });
            localStorage.setItem("authorText", localAuthorText); // set localStorage
            dispatch({ type: "SET_AUTHOR_TEXT", payload: localAuthorText });
            navigate(`/search/title-author?p1=${encodeURIComponent(e.target.value)}&p2=${encodeURIComponent(unofficialAuthorText)}&page=1`)

            break;
          }
          default: 'title'
        }
      }
    // if(state.searchType.includes("author") && state.searchType.includes("title")) {
      //   const unofficialAuthorText = searchAuthorRefs.current.searchAuthorInputRef.value;
      //   console.log(unofficialAuthorText)
      //   dispatch({ type : "SET_SEARCH_TEXT" , payload : e.target.value });
      //   localStorage.setItem("authorText" , localAuthorText);
      //   dispatch({ type : "SET_AUTHOR_TEXT" , payload : localAuthorText });
      //   // navigate(`/search/title-author?p1=${encodeURIComponent(e.target.value)}&p2=${encodeURIComponent(state.author)}&page=1`)
      //   navigate(`/search/title-author?p1=${encodeURIComponent(e.target.value)}&p2=${encodeURIComponent(unofficialAuthorText)}&page=1`)
      //   return; 
      // }

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
          {/* this removes the hover effect for the bg and text if you clicked while its off
          element.classList.remove("hover:bg-amber-50", "hover:text-black");
          then add the css for when you want to untoggle
          element.classList.add("bg-amber-50", "text-black", "hover:bg-[var(--mycolor-bg)]", "hover:text-amber-100");

          this removes the amber bg and text black if you click it while its on
          element.classList.remove("bg-amber-50","text-black", "hover:bg-primary-ebony-clay", "hover:bg-amber-50");

          element.classList.add("hover:bg-amber-50" , "hover:text-black"); */}

          <button className={`search-title 
          ${clickedSearchTitle
              ? ("hover:bg-[var(--mycolor-bg)] bg-amber-50 hover:text-amber-100")
              : ("hover:bg-amber-50 hover:text-black text-amber-100")}  
            duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] cursor-pointer hover:shadow-lg`}
            onClick={() => buttonSearchTitle()} ref={searchTitle}>Title Search
          </button>

          {!(searchType.includes("title") && searchType.includes("author")) &&
            // opposite of when author and title search are active
            <>
              <button className={`
              search-author ${clickedSearchAuthor
                  ? 'hover:bg-[var(--mycolor-bg)] text-black bg-amber-50 hover:text-amber-100'
                  : 'hover:bg-amber-50 hover:text-black text-amber-100'}
                  duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] cursor-pointer hover:shadow-lg opacity-0`}
                // sm:w-[174px] md:w-[250px] lg:w-[300px]
                onClick={() => buttonSearchAuthor()} ref={searchAuthorBtn}>Author Search</button>
            </>
          }

          {searchType.includes("author") && searchType.includes("title")
            && // if it includes 2 searchtypes in the searchType array it will initiate search by title and author
            (<SearchAuthor dispatch={dispatch} setClickedSearchAuthor={setClickedSearchAuthor} ref={searchAuthorRefs} clickedSearchAuthor={clickedSearchAuthor} clickedSearchTitle={clickedSearchTitle} setLocalAuthorText={setLocalAuthorText} localAuthorText={localAuthorText} />) // pass in the states for it to works
          }

          <div className='inner-search flex flex-row gap-2 items-center rounded-4xl p-4 bg-amber-50 h-[70px] justify-center'>
            <input
              ref={searchBarInputRef}
              required
              className={`input-search hidden w-0 rounded-2xl outline-0 font-inter`}
              type="text"
              defaultValue={localSearchText}
              onKeyDown={(e) => {
                if (state.searchType[0] === null && state.searchType[1] === null) {
                  alert("SearchType needs to be toggled")
                } else {
                  onSubmitSearch(e);
                }
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
