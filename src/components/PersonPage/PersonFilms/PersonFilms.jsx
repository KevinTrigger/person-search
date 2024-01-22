import PropTypes from 'prop-types';
import cl from './PersonFilms.module.scss';

import { useState, useEffect } from 'react';
import { makeConcurrentRequest, changeHTTP } from '@utils/network';


const PersonFilms = ({personFilms}) => {

  const [filmsName, setFilmsName] = useState([]);
  
  useEffect(() => {
    (async () => {
      const filmsHTTPS = personFilms.map(url => changeHTTP(url));
      const response = await makeConcurrentRequest(filmsHTTPS);

      setFilmsName(response);
    })();
  }, [])

  return (
    <div className={cl.wrapper}>
      <ul className={cl.list__container}>
        {filmsName
          .sort((a,b) => a.episode_id-b.episode_id)
          .map(({title, episode_id}) => (
            <li key={episode_id} className={cl.list__item}>
                <span className={cl.item__episode}>Episode {episode_id}</span>
                <span className={cl.item__colon}> : </span>
                <span className={cl.item__title}>{title}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

PersonFilms.propTypes = {
  personFilms: PropTypes.array
}

export default PersonFilms;