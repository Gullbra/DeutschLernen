import { ILayoutProps } from '../interfaces/IProps'
import { Header } from './Header'
import '../styles/layout/layout.css'

export const Layout = ({ children }: ILayoutProps) => (
  <>
    <Header/>
    <main className='site__layout__main'>
      { children }
    </main>
  </>
)
