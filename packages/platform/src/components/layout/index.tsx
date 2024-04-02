import CardLayout from './card'
import Container from './container'
import TabNavContainer from './container/tab-nav'
import TableLayout from './table'
import useTableSearchParams from './table/useTableSearchParams'

interface ILayout {
  Table: typeof TableLayout
  Container: typeof Container
  Card: typeof CardLayout
  TabNavContainer: typeof TabNavContainer
}

const Layout: ILayout = {
  Table: TableLayout,
  Container,
  Card: CardLayout,
  TabNavContainer,
}

export { useTableSearchParams }

export default Layout
