import {NavLink} from "react-router-dom";

import cl from './Header.module.scss';

const Header = () => {
  return (
    <div className={cl.container}>
        <ul className={cl.list__container}>
          <li><NavLink to="/" exact>Search</NavLink></li>
        </ul>
    </div>
  )
}

export default Header;