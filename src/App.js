import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading';



function App() {
  const [movies, setMovies] = useState([]) 
  const [searchValue, setSearchValue] = useState("")

  const getMovieRequest = async() => {
    const url = 'http://www.omdbapi.com/?s=star wars&apikey=7e4d27ca'

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson)
    setMovies(responseJson.Search)
  }

  useEffect(() => {
    getMovieRequest()
  }, [])

  return (
    <div className = 'container-fluid movie-app'>
      <div className = "row">
        <MovieListHeading heading = 'movies'/>
      </div>
      <div className = 'row'>
        <MovieList movies={movies}/>
      </div>
    </div>
  );
}

export default App;

