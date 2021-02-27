import { writable } from 'svelte/store'

import type {
  IPersonCastCredits,
  IPersonCrewCastCredits,
  IPersonCrewCredits,
} from '../types/person'

interface IStore {
  details?: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  loading: boolean
  error: string
}

const store = writable<IStore>({
  details: undefined,
  credits: undefined,
  loading: false,
  error: '',
})

export default store
