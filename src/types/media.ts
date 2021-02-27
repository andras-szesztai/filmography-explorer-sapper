import type { IGenreObject } from './genres'

export type TMedia = 'movie' | 'tv'

export interface IMovieDetails {
  id: number
  genres: Array<IGenreObject>
  title: string
  vote_average: number
  vote_count: number
  overview?: string
  tagline?: string
  poster_path?: string
  release_date?: string
  budget?: number
  revenue?: number
  runtime?: number
}

export interface ISeriesDetails {
  id: number
  name: string
  genres: Array<IGenreObject>
  number_of_episodes: number
  number_of_seasons: number
  vote_average: number
  vote_count: number
  popularity: number
  first_air_date?: string
  last_air_date?: string
  next_episode_to_air?: string
  overview?: string
  poster_path?: string
  tagline?: string
}

export interface IMediaCredits {
  id: number
  cast: {
    id: number
    credit_id: string
    name: string
    popularity: number
    character: string
  }
  crew: {
    id: number
    credit_id: string
    name: string
    popularity: number
    job: string
  }
}
