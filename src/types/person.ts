import type { TMedia } from './media'

export type TCredit = 'crew' | 'cast' | 'cast & crew'

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

interface IPersonCreditBase {
  id: number
  credit_id: string
  vote_count: number
  vote_average: number
  unified_date: Date
  name?: string
  title?: string
  original_language?: string
  episode_count?: number
  overview?: string
  origin_country?: string[]
  original_name?: string
  media_type?: TMedia
  popularity?: number
  backdrop_path?: string
  first_air_date?: string
  release_date?: string
  genre_ids?: number[]
  poster_path?: string
}

export interface IPersonCastCredits extends IPersonCreditBase {
  type: 'cast'
  character?: string
}

export interface IPersonCrewCredits extends IPersonCreditBase {
  type: 'crew'
  department?: string
  job?: string
}

export interface IPersonCrewCastCredits extends IPersonCreditBase {
  type: 'cast & crew'
  character?: string
  department?: string
  job?: string
}

export interface IPersonCombinedCredits {
  id: number
  cast?: Omit<IPersonCastCredits, 'type'>[]
  crew?: Omit<IPersonCrewCredits, 'type'>[]
}
