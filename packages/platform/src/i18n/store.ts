import { useStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import pkgJSON from '@/../package.json'

import { LangEnum } from './typing'

export interface I18NStore {
  currentLang: LangEnum
  setCurrentLang: (nextLang: LangEnum) => void
}

export const currentLangStore = createStore<I18NStore>()(persist((set) => ({
  currentLang: LangEnum.zhCN,
  setCurrentLang(nextLang) {
    set({ currentLang: nextLang })
  },
}), { name: `${pkgJSON.name}_${pkgJSON.version}_i18n`, storage: createJSONStorage(() => localStorage) }))

export function useCurrentLang<T = I18NStore>(
  selector?: (state: I18NStore) => T,
  equals?: (a: T, b: T) => boolean
) {
  return useStore(currentLangStore, selector!, equals)
}
