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
  gender?: 1 | 2
  place_of_birth?: string
  popularity?: number
  profile_path?: string
}

export interface IPersonCastCredits {
  id: number
  credit_id: string
  name: string
  type: TCredit
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
  vote_average?: number
  vote_count?: number
  character?: string
  backdrop_path?: string
  popularity?: number
}

export interface IPersonCrewCredits {
  id: number
  credit_id: string
  type: TCredit
  department?: string
  original_language?: string
  episode_count?: number
  job?: string
  overview?: string
  origin_country?: string[]
  original_name?: string
  vote_count?: number
  name?: string
  media_type?: TMedia
  popularity?: number
  backdrop_path?: string
  first_air_date?: string
  release_date?: string
  vote_average?: number
  genre_ids?: number[]
  poster_path?: string
}

export interface IPersonCombinedCredits {
  id: number
  cast?: Omit<IPersonCastCredits, 'type'>[]
  crew?: Omit<IPersonCrewCredits, 'type'>[]
}
