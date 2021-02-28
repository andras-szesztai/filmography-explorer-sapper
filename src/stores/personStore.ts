import { writable } from 'svelte/store'
import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { isEmpty, uniqBy } from 'lodash'

import { MOVIE_DB_URL } from '../constants/requests'
import { CEREMONIES } from '../constants/data'

import type {
  IPersonCastCredits,
  IPersonCombinedCredits,
  IPersonCrewCastCredits,
  IPersonCrewCredits,
  IPersonDetails,
} from '../types/person'

export interface IPersonStore {
  id: number
  details?: IPersonDetails
  credits?: Array<
    IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  >
  loading: boolean
  error: string
}

const { subscribe, set, update } = writable<IPersonStore>({
  id: 0,
  details: undefined,
  credits: undefined,
  loading: false,
  error: '',
})
interface ICreditArrays {
  crew: Omit<IPersonCrewCredits, 'type' | 'unified_date'>[]
  cast: Omit<IPersonCastCredits, 'type' | 'unified_date'>[]
}

const sharedFilterLogic = (d: IPersonCrewCredits | IPersonCastCredits) => {
  return (
    (!!d.release_date || !!d.first_air_date) &&
    !!d.vote_count &&
    !!d.vote_average &&
    d.vote_average !== 10 &&
    d.vote_average !== 0 &&
    (d.name ? !CEREMONIES.includes(d.name) : true)
  )
}

function filterData<K extends keyof ICreditArrays>(
  method: K,
  array?: ICreditArrays[K]
) {
  if (array) {
    if (method === 'crew') {
      return (array as IPersonCrewCredits[]).filter(
        (d) => sharedFilterLogic(d) && d.job
      )
    } else {
      return (array as IPersonCastCredits[]).filter(
        (d) =>
          sharedFilterLogic(d) &&
          d.character &&
          !d.character.toLowerCase().match(/(himself|herself|archive)/)
      )
    }
  }
  return []
}

function formatData<K extends keyof ICreditArrays>(
  method: K,
  array: ICreditArrays[K]
) {
  return (array as (
    | Omit<IPersonCrewCredits, 'type' | 'unified_date'>
    | Omit<IPersonCastCredits, 'type' | 'unified_date'>
  )[]).map((d) => {
    return {
      ...d,
      type: method,
      unified_date: dayjs(d.first_air_date || d.release_date).toDate(),
    }
  })
}

const personStore = {
  subscribe,
  populate: (id: string, apiKey: string) => {
    update((state) => ({ ...state, loading: true, error: '' }))
    axios
      .all([
        axios.get(
          `${MOVIE_DB_URL}/person/${id}?api_key=${apiKey}&language=en-US`
        ),
        axios.get(
          `${MOVIE_DB_URL}/person/${id}/combined_credits?api_key=${apiKey}&language=en-US`
        ),
      ])
      .then(
        axios.spread(
          (personDetails: AxiosResponse, personCredits: AxiosResponse) => {
            const personDetailsData = personDetails.data as IPersonDetails
            const personCreditsData = personCredits.data as IPersonCombinedCredits
            const filteredCrewData: ICreditArrays['crew'] = filterData(
              'crew',
              personCreditsData.crew
            )
            const filteredCastData: ICreditArrays['cast'] = filterData(
              'cast',
              personCreditsData.cast
            )
            const formattedCrewData: IPersonCrewCredits[] = formatData(
              'crew',
              filteredCrewData
            )
            const formattedCastData: IPersonCastCredits[] = formatData(
              'cast',
              filteredCastData
            )
            const uniqIds = uniqBy(
              [...formattedCrewData, ...formattedCastData],
              'id'
            ).map((d) => d.id)
            const combinedCredits: Array<
              IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
            > = uniqIds
              .map((d) => {
                const crewCredit = formattedCrewData.find((c) => c.id === d)
                const castCredit = formattedCastData.find((c) => c.id === d)
                let newObject:
                  | IPersonCrewCredits
                  | IPersonCastCredits
                  | IPersonCrewCastCredits
                if (crewCredit && castCredit) {
                  newObject = {
                    ...crewCredit,
                    ...castCredit,
                    type: 'cast & crew',
                  }
                } else {
                  newObject =
                    crewCredit || castCredit || ({} as IPersonCrewCredits)
                }
                return newObject
              })
              .filter((d) => !isEmpty(d))
              .sort((a, b) => b.vote_count - a.vote_count)

            set({
              id: +id,
              details: personDetailsData,
              credits: combinedCredits,
              loading: false,
              error: '',
            })
          }
        )
      )
      .catch(() => {
        set({
          id: 0,
          details: undefined,
          credits: undefined,
          loading: false,
          error: 'Sorry, something went wrong, please try again later.',
        })
      })
  },
  empty: () => {
    set({
      id: 0,
      details: undefined,
      credits: undefined,
      loading: false,
      error: '',
    })
  },
}

export default personStore
