import { writable } from 'svelte/store'

import type { TPathNames } from '../types/links'

export const currPath = writable<TPathNames | ''>('')
