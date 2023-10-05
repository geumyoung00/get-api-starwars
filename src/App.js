import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
// API : https://swapi.dev/api/films

function App() {
  const [movies, setMovies] = useState();

  const getMovies = async (word) => {
    const res = await fetch('https://swapi.dev/api/films');
    console.log('res___', res);
    const json = await res.json();
    console.log('json___', json);
    // API에서 필요한 정보만 배열로 담기 (map method)
    const movieList = json.results.map((movie) => {
      // moveis = {id, title, openingText, releaseDate}
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovies(movieList);
    console.log(movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>{'' && <MoviesList movies={movies} />}</section>
    </React.Fragment>
  );
}

export default App;
