import type { IGenreObject } from './genres'

export type TMedia = 'movie' | 'tv'

export interface IMovieDetails {
  id: number
  title: string
  overview?: string
  poster_path?: string
  release_date?: string
  budget?: number
  revenue?: number
  runtime?: number
  genres: Array<IGenreObject>
  vote_average: number
  vote_count: number
}

export interface ISeriesDetails {
  id: number
  name: string
  overview?: string
  poster_path?: string
  first_air_date?: string
  last_air_date?: string
  number_of_episodes: number
  number_of_seasons: number
  genres: Array<IGenreObject>
  vote_average: number
  vote_count: number
}

export interface IMediaCredits {
  id: number
  cast: Array<{
    id: number
    credit_id: string
    name: string
    popularity: number
    character: string
  }>
  crew: Array<{
    id: number
    credit_id: string
    name: string
    popularity: number
    job: string
  }>
}
