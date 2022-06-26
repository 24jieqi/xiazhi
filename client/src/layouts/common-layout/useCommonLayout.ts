import create from 'zustand'

type ILayoutState = {
  menuShown: boolean
  toggleMenuShown: () => void
}

const useCommonLayout = create<ILayoutState>(set => ({
  menuShown: true,
  toggleMenuShown: () => {
    set(prev => ({ menuShown: !prev.menuShown }))
  },
}))

export default useCommonLayout
