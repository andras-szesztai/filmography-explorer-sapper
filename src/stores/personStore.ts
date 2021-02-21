import { writable } from 'svelte/store'
import axios, { AxiosResponse } from 'axios'

import { MOVIE_DB_URL } from '../constants/requests'

import type { IPersonCombinedCredits, IPersonDetails } from '../types/person'

const { subscribe, set } = writable({
  details: {} as IPersonDetails,
})

const personStore = {
  subscribe,
  populate: (id: string, apiKey: string) => {
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
          }
        )
      )
  },
}

export default personStore
