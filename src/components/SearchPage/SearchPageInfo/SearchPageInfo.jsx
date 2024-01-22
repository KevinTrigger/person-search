import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import cl from './SearchPageInfo.module.scss';
import PageLoader from '@components/PageLoader/PageLoader';

const SearchPageInfo = ({people}) => {

  return (
      (people.length 
        ? (
          <ul className={cl.wrapper}>
          {people.map((hero) => (
            <li key={hero.id} className={cl.card}>
              <NavLink to={`/people/${hero.id}`}>
                  <img src={hero.img} alt="name" className={cl.card__img}/>
                  <p className={cl.card__name}>{hero.name}</p>
              </NavLink>
            </li>
          ))}
      </ul>
        )
        :
        <PageLoader />)
  )
}

SearchPageInfo.propTypes = {
  people: PropTypes.array
}

export default SearchPageInfo;