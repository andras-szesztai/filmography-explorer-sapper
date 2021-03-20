import { writable } from 'svelte/store'
import axios, { AxiosResponse } from 'axios'
import { uniqBy } from 'lodash'

import { MOVIE_DB_URL } from '../constants/requests'

import type { IGenreObject } from '../types/genres'

interface IGenreStore {
  genreList: IGenreObject[]
  loading: boolean
  error: string
}

const { subscribe, set, update } = writable<IGenreStore>({
  genreList: [],
  loading: false,
  error: '',
})

const genreStore = {
  subscribe,
  populate: (apiKey: string) => {
    update((state) => ({ ...state, loading: true, error: '' }))
    axios
      .all([
        axios.get(
          `${MOVIE_DB_URL}/genre/movie/list?api_key=${apiKey}&language=en-US`
        ),
        axios.get(
          `${MOVIE_DB_URL}/genre/tv/list?api_key=${apiKey}&language=en-US`
        ),
      ])
      .then(
        axios.spread(
          (
            movieGenres: AxiosResponse<any>,
            seriesGenres: AxiosResponse<any>
          ) => {
            const combined = [
              ...(movieGenres.data.genres as Array<IGenreObject>),
              ...(seriesGenres.data.genres as Array<IGenreObject>),
            ]
            update((state) => ({
              ...state,
              genreList: uniqBy(combined, 'id'),
              loading: false,
            }))
          }
        )
      )
      .catch((err) => {
        set({
          genreList: [],
          loading: false,
          error: 'Sorry, something went wrong, please try again later.',
        })
      })
  },
}

export default genreStore
