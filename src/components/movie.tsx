import React, { MouseEventHandler } from 'react';
import PropTypes, { InferProps } from 'prop-types';

export const moviePropTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  imdbID: PropTypes.string,
  Type: PropTypes.string,
  Poster: PropTypes.string,
};

export interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MoviePropType {
  movie: MovieType;
  addToFav: (movie: MovieType) => void;
}

// export type MovieType = InferProps<typeof moviePropTypes>;

export default function Movie({ movie, addToFav }: MoviePropType) {
  return (
    <div className="card movieContainer" key={movie.imdbID}>
      <div className="card-body">
        <div className="movieLayout">
          <div className="posterContainer">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="movieInformation">
            {movie.Title} ({movie.Year})
          </div>
          <div className="buttonLayout">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => addToFav(movie)}
            >
              Add To Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Movie.propTypes = moviePropTypes;
