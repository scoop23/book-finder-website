import React from 'react'
import BookSearchContainer from './components/BookSearchContainer'
import './App.css'
import SearchBar from './components/SearchBar'
import { BrowserRouter, Route, Routes } from "react-router";
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='search' element={<SearchPage />}>
            <Route path='title' element={<titleSearchPage />}></Route>
            <Route path='author'></Route>
            <Route path='title-author'></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App