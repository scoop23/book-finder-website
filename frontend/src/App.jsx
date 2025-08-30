import React from 'react'
import BookSearchContainer from './components/BookSearchContainer'
import './App.css'
import SearchBar from './components/SearchBar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import TitlePageResults from './pages/SearchPage/TitlePageResults.jsx';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='search' element={<SearchPage />}>
              <Route path='title' element={<TitlePageResults />}></Route>
              <Route path='author'></Route>
              <Route path='title-author'></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App