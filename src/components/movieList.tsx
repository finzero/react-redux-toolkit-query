import Movie, { MovieType, MoviePropType } from './movie';

interface MovieListProp {
  movies: MovieType[];
  addToFav: (movie: MovieType) => void;
}

export default function MovieList({ movies, addToFav }: MovieListProp) {
  return (
    <div className="movieListContainer">
      {movies.length ? (
        movies.map((movie: MovieType) => (
          <Movie key={movie.imdbID} movie={movie} addToFav={addToFav} />
        ))
      ) : (
        <div>Movie List Empty, Search Your Movie</div>
      )}
    </div>
  );
}

MovieList.propTypes = {};
