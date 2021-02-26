import { writable } from 'svelte/store'

import type {
  IPersonCastCredits,
  IPersonCrewCredits,
  IPersonCrewCastCredits,
} from '../types/person'

interface IStore {
  hoveredData?: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  isHovered: boolean
}

const store = writable<IStore>({
  hoveredData: undefined,
  isHovered: false,
})

export default store
