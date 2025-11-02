import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import TitlePageResults from './pages/SearchPage/TitlePageResults.jsx';
const MainPage = React.lazy(() => import("./components/MainPage.jsx"));
import BookSearchProvider, { BookSearchContext } from './context/BookSearchContext.jsx';
import AuthorPageResults from './pages/SearchPage/AuthorPageResults/index.jsx';
import TitleAndAuthorPageResults from './pages/SearchPage/TitleAndAuthorPageResults/index.jsx';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import DemoPage from './pages/Demo/index.jsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* AuthContext */}
        <BookSearchProvider>  
          <BrowserRouter>
            <Routes>
              {/* preferebly BookSearchProvider here */}
                <Route path='demo' element={<DemoPage />}></Route>
                <Route path='search' element={<SearchPage />}>
                  <Route index element={<MainPage />}/>
                  <Route path='title' element={<TitlePageResults />}></Route>
                  <Route path='author' element={<AuthorPageResults />}></Route>
                  <Route path='title-author' element={<TitleAndAuthorPageResults />}></Route>
                </Route>
            </Routes>
          </BrowserRouter>
        </BookSearchProvider>
      </QueryClientProvider>
    </>
  )
}

export default App