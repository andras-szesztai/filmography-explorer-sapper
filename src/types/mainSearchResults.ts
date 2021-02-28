interface ISearchResultBase {
  id: string
}

export enum SearchTypes {
  person = 'person',
  movie = 'movie',
}

export type TSearchTypes = SearchTypes

export interface IMovieSearchResult extends ISearchResultBase {
  genre_ids: number[]
  backdrop_path: string
  title: string
  poster_path: string
  release_date: string
  popularity: number
  media_type: string
}

export interface ISeriesSearchResult extends ISearchResultBase {
  genre_ids: number[]
  backdrop_path: string
  name: string
  poster_path: string
  release_date: string
  popularity: number
  media_type: string
}

export interface IPersonSearchResult extends ISearchResultBase {
  name: string
  known_for_department: string
  profile_path: string
}
