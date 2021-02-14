interface ISearchResultBase {
  id: string
}

export type TSearchTypes = 'person' | 'movie'
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
