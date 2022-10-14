import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'aec702d3';
interface SearchMovieParam {
  s?: string;
  y?: number | string | undefined;
}

interface SearchResponse {
  Response: string;
  Error: string | null | undefined;
  Search?: any[];
}

interface Response {
  status: string;
  message: string | undefined | null;
  data: any[];
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://www.omdbapi.com`,
  }),
  endpoints: (builder) => ({
    getMovieByTitle: builder.query({
      query: (title: string) => ({
        url: '',
        params: { apiKey: API_KEY, t: title },
      }),
    }),
    searchMovie: builder.query({
      query: ({ s, y }: SearchMovieParam) => ({
        url: '',
        params: { apiKey: API_KEY, s, y },
      }),
      transformResponse: ({ Response, Error, Search }: SearchResponse) => {
        let response: Response = {
          status: Response === 'False' ? 'error' : 'success',
          message: Response === 'False' ? Error : '',
          data: Search || [],
        };
        console.log(response);
        return response;
      },
    }),
    searchByYear: builder.query({
      query: (year: number | string | undefined) => ({
        url: '',
        params: { apiKey: API_KEY, y: year },
      }),
    }),
  }),
});

export const {
  useGetMovieByTitleQuery,
  useSearchMovieQuery,
  useSearchByYearQuery,
  useLazySearchMovieQuery,
} = moviesApi;
