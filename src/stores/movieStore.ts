import { writable } from 'svelte/store'

interface IStore {
  details?: undefined
  loading: boolean
  error: string
}

const store = writable<IStore>({
  details: undefined,
  loading: false,
  error: '',
})

export default store
