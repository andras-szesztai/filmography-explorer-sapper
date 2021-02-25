import { writable } from 'svelte/store'
import axios, { AxiosResponse } from 'axios'

import { MOVIE_DB_URL } from '../constants/requests'
import { CEREMONIES } from '../constants/data'
import detailsExample from '../data/personDetailExample'

import type {
  IPersonCastCredits,
  // IPersonCombinedCredits,
  IPersonCrewCredits,
  IPersonDetails,
} from '../types/person'

interface IPersonStore {
  details?: IPersonDetails
  credits?: (IPersonCrewCredits | IPersonCastCredits)[]
  loading: boolean
  error: string
}

const { subscribe, set, update } = writable<IPersonStore>({
  details: undefined,
  credits: undefined,
  loading: false,
  error: '',
})
interface ICreditArrays {
  crew: Omit<IPersonCrewCredits, 'type'>[]
  cast: Omit<IPersonCastCredits, 'type'>[]
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
    | Omit<IPersonCrewCredits, 'type'>
    | Omit<IPersonCastCredits, 'type'>
  )[]).map((d) => ({ ...d, type: method }))
}

// TODO; aadd to localStorage to fetch last onMount

const personStore = {
  subscribe,
  populate: (id: string, apiKey: string) => {
    update((state) => ({ ...state, loading: true, error: '' }))
    axios
      .all([
        axios.get(
          `${MOVIE_DB_URL}/person/${id}?api_key=${apiKey}&language=en-US`
        ),
        // axios.get(
        //   `${MOVIE_DB_URL}/person/${id}/combined_credits?api_key=${apiKey}&language=en-US`
        // ),
      ])
      .then(
        axios.spread(
          (
            personDetails: AxiosResponse
            //  personCredits: AxiosResponse
          ) => {
            const personDetailsData = personDetails.data as IPersonDetails
            // const personCreditsData = personCredits.data as IPersonCombinedCredits
            // const filteredCrewData: ICreditArrays['crew'] = filterData(
            //   'crew',
            //   personCreditsData.crew
            // )
            // const filteredCastData: ICreditArrays['cast'] = filterData(
            //   'cast',
            //   personCreditsData.cast
            // )
            // const formattedCrewData: IPersonCrewCredits[] = formatData(
            //   'crew',
            //   filteredCrewData
            // )
            // const formattedCastData: IPersonCastCredits[] = formatData(
            //   'cast',
            //   filteredCastData
            // )
            // const sortedCombinedCredits = [
            //   ...formattedCrewData,
            //   ...formattedCastData,
            // ].sort((a, b) => b.vote_count - a.vote_count)
            set({
              details: personDetailsData,
              credits: [],
              loading: false,
              error: '',
            })
          }
        )
      )
      .catch(() => {
        set({
          details: undefined,
          credits: undefined,
          loading: false,
          error: 'Sorry, something went wrong, please try again later.',
        })
      })
  },
}

export default personStore
