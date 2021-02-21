import type { TMedia } from './media'

export type TCredit = 'crew' | 'cast'

export interface IPersonDetails {
  id: number
  known_for_department: string
  name: string
  imdb_id?: string
  also_known_as?: string[]
  biography?: string
  birthday?: string // YYYY-MM-DD
  deathday?: string
  gender?: number
  place_of_birth?: string
  popularity?: number
  profile_path?: string
}

export interface IPersonCastCredits {
  id: number
  credit_id: string
  type: 'cast'
  vote_count: number
  vote_average: number
  name?: string
  title?: string
  media_type?: TMedia
  original_language?: string
  episode_count?: number
  overview?: string
  origin_country?: string[]
  original_name?: string
  genre_ids?: number[]
  poster_path?: string
  first_air_date?: string
  release_date?: string
  character?: string
  backdrop_path?: string
  popularity?: number
}

export interface IPersonCrewCredits {
  id: number
  credit_id: string
  type: 'crew'
  vote_count: number
  vote_average: number
  department?: string
  original_language?: string
  episode_count?: number
  job?: string
  overview?: string
  origin_country?: string[]
  original_name?: string
  name?: string
  title?: string
  media_type?: TMedia
  popularity?: number
  backdrop_path?: string
  first_air_date?: string
  release_date?: string
  genre_ids?: number[]
  poster_path?: string
}

export interface IPersonCombinedCredits {
  id: number
  cast?: Omit<IPersonCastCredits, 'type'>[]
  crew?: Omit<IPersonCrewCredits, 'type'>[]
}
