import React, { useRef } from 'react';
import { add } from './features/cartSlice';
import { useDispatch } from 'react-redux';
import { useLazySearchMovieQuery } from './services/apiSlice';
import MovieList from './components/movieList';
import { MovieType } from './components/movie';
import rotateArrow from './assets/rotate-arrow-100.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const movieSearch = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);

  const [fetchMovie, { isFetching, data: response, error }] =
    useLazySearchMovieQuery();

  const currentYear = new Date().getFullYear();
  const yearData: number[] = [];
  for (let c = currentYear; c >= currentYear - 50; c--) {
    yearData.push(c);
  }

  const dispatch = useDispatch();

  const handleAddToFav = (movie: MovieType) => {
    dispatch(add(movie));
  };

  let typingTimeout: any = null;
  const handleFetchMovie = () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      fetchMovie({
        s: movieSearch.current?.value || undefined,
        y: yearRef.current?.value || undefined,
      });
    }, 500);
  };

  return (
    <div className="container container-fluid">
      <div className="movieSearchBar">
        <div className="row">
          <div className="col-10">
            <input
              className="form-control col-md-5"
              ref={movieSearch}
              type="text"
              name="search"
              id="search"
              placeholder="search movie"
              onChange={handleFetchMovie}
            />
          </div>
          <div className="col-2">
            <select
              ref={yearRef}
              onChange={handleFetchMovie}
              name="year"
              id="year"
              className="col-md-2 form-control"
            >
              <option key={''} value={''}>
                All Year
              </option>
              {yearData.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isFetching && (
        <div className="loadingContainer">
          <img src={rotateArrow} alt="loading" className="loading" /> <br />
          Fetching Your Movie(s), <br /> Please Wait...
        </div>
      )}

      {!isFetching && response && response.status === 'success' ? (
        <MovieList
          movies={response && response.data ? response.data : []}
          addToFav={handleAddToFav}
        />
      ) : (
        <div className="text-center">{response?.message}</div>
      )}

      {!isFetching && !response && (
        <div className="text-center">Search Your Movie</div>
      )}
    </div>
  );
}

export default App;
