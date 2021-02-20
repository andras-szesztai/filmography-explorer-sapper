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
  original_title?: string
  poster_path: string
  release_date: string
}

export interface IPersonSearchResult extends ISearchResultBase {
  name: string
  known_for_department: string
  profile_path: string
}

export interface IMovieSearchDataState {
  selected: SearchTypes.movie
  data: IMovieSearchResult[]
}

export interface IPersonSearchDataState {
  selected: SearchTypes.person
  data: IPersonSearchResult[]
}
