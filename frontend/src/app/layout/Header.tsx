
import './header.css'
import { IHeaderProps } from '../../interfaces/IProps'

export const Header = ({}: IHeaderProps) => {
  return (
    <header className='site__layout__header'>
      <h1>DeutschLernen Web Interface</h1>

      <nav className='site__layout__nav-bar'>
        <h2>This is</h2>
        <h2>a navbar</h2>
      </nav>
    </header>
  )
}
