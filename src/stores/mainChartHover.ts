import { writable } from 'svelte/store'

import type {
  IPersonCastCredits,
  IPersonCrewCredits,
  IPersonCrewCastCredits,
} from '../types/person'

interface IHoveredData {
  data: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  yPosition: number
  xPosition: number
  radius: number
}
interface IStore {
  hoveredData?: IHoveredData
  isHovered: boolean
}

const store = writable<IStore>({
  hoveredData: undefined,
  isHovered: false,
})

export default store
