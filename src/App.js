import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading';
import SearchBar from './components/SearchBar';
import AddWatched from './components/AddWatched';
import RemoveWatched from './components/RemoveWatched';



function App() {


  const [movies, setMovies] = useState([]) 
  const [searchValue, setSearchValue] = useState(``)
  const [watched, setWatched] = useState([])



  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7e4d27ca`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('popFlix-movie-favorites', JSON.stringify(items))
  }


  const addWatchedMovie = (movie) => {
    const newWatchedList = [...watched, movie]
    setWatched(newWatchedList);
    saveToLocalStorage(newWatchedList);
  }


  const removeWatchedMovie = (movie) => {
    const newWatchedList = watched.filter((watched) => watched.imdbID !== movie.imdbID);
    setWatched(newWatchedList);
  }


  return (
    <div className = 'container-fluid movie-app'>
      <div className = "row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'PopFlix'/>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      
      <div className = 'row'>
        <MovieList movies={movies} 
        watchedComponent={AddWatched} 
        handleWatchedClick = {addWatchedMovie}/>
      </div>

      <div className = "row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'Watched List'/>
      </div>

      <div className = 'row'>
        <MovieList movies={watched} 
        watchedComponent={RemoveWatched} 
        handleWatchedClick = {removeWatchedMovie}/>
      </div>


    </div>
  );
}

export default App;

