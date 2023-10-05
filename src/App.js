import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
// API : https://swapi.dev/api/films

function App() {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const res = await fetch('https://swapi.dev/api/films');
      if (!res.ok) {
        throw new Error('응답이 없습니다.');
      }
      const json = await res.json();

      // API에서 필요한 정보만 배열로 담기 (map method)
      const movieList = json.results.map((movie) => {
        // moveis = {id, title, openingText, releaseDate}
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(movieList);
      console.log('moveis___', movies);
    } catch (error) {
      setErrorMsg(error.message);
      console.log('error___', error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <p>{errorMsg}</p> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
