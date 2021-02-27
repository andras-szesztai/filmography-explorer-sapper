import { writable } from 'svelte/store'
import axios, { AxiosResponse } from 'axios'

import { MOVIE_DB_URL } from '../constants/requests'

import type {
  IMediaCredits,
  IMovieDetails,
  ISeriesDetails,
} from '../types/media'

interface IStore {
  id: number
  details?: IMovieDetails | ISeriesDetails
  credits?: IMediaCredits
  loading: boolean
  error: string
}

const { subscribe, set, update } = writable<IStore>({
  id: 0,
  details: undefined,
  credits: undefined,
  loading: false,
  error: '',
})

const movieStore = {
  subscribe,
  populate: (id: number, media: string, apiKey: string) => {
    update((state) => ({ ...state, id, loading: true, error: '' }))
    axios
      .all([
        axios.get(
          `${MOVIE_DB_URL}/${media}/${id}?api_key=${apiKey}&language=en-US`
        ),
        axios.get(
          `${MOVIE_DB_URL}/${media}/${id}/credits?api_key=${apiKey}&language=en-US`
        ),
      ])
      .then(
        axios.spread(
          (
            details: AxiosResponse<unknown>,
            credits: AxiosResponse<unknown>
          ) => {
            const mediaDetailsData = details.data as
              | IMovieDetails
              | ISeriesDetails
            const mediaCreditsData = credits.data as IMediaCredits
            update((s) => ({
              ...s,
              details: mediaDetailsData,
              credits: mediaCreditsData,
              loading: false,
            }))
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
  empty: () =>
    set({
      id: 0,
      details: undefined,
      credits: undefined,
      loading: false,
      error: '',
    }),
}

export default movieStore
