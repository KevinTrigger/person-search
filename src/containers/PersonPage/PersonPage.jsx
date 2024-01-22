import PropTypes from 'prop-types';

import React, {useState, useEffect, Suspense} from 'react';
import {useParams} from 'react-router-dom';

import PersonInfo from '@components/PersonPage/PersonInfo';
import PersonPhoto from '@components/PersonPage/PersonPhoto';
import PersonLinkBack from '@components/PersonPage/PersonLinkBack';

import UiLoading from '@UI/UiLoading';

import {withErrorApi} from '@hoc-helpers/withErrorApi';
import {getApiResourse} from '@utils/network';
import {getPeopleImage} from '@services/getPeopleData';
import {API_PERSON} from '@constants/api';

import cl from './PersonPage.module.scss';

const componentPromise = import('@components/PersonPage/PersonFilms');
const PersonFilms = React.lazy(() => componentPromise);

const PersonPage = ({ setErrorApi }) => {

  const [personInfo, setPersonInfo] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personPhoto, setPersonPhoto] = useState(null);
  const [personFilms, setPersonFilms] = useState(null);

  const params = useParams();

  useEffect(() => {
    (async () => {
      const id = params.id;
      
      const res = await getApiResourse(`${API_PERSON}/${id}/`)

      if (res) {
        setPersonInfo([
          { title: 'Name', data: res.name },
          { title: 'Height', data: res.height },
          { title: 'Mass', data: res.mass },
          { title: 'Hair Color', data: res.hair_color },
          { title: 'Skin Color', data: res.skin_color },
          { title: 'Eye Color', data: res.eye_color },
          { title: 'Birth Year', data: res.birth_year },
          { title: 'Gender', data: res.gender },
        ])
        
        setPersonName(res.name);
        setPersonPhoto(getPeopleImage(id));
        
        res.films.length && setPersonFilms(res.films);

        setErrorApi(false);
      } else {
        setErrorApi(true);
      }

    })();
  }, [])

  return (
    <>
      <PersonLinkBack />
      <div className={cl.wrapper}>
          <span className={cl.person__name}>{personName}</span>
          <div className={cl.person__info}>
              <PersonPhoto 
                personName={personName}
                personPhoto={personPhoto}
            
              />
            {personInfo && <PersonInfo personInfo={personInfo}/>}
            {personFilms && (
              <Suspense fallback={<UiLoading />}>
                <PersonFilms personFilms={personFilms}/>
              </Suspense>
            )}
          </div>
      </div>
    </>
  ) 
}

PersonPage.propTypes = {
  setErrorApi: PropTypes.func,
}

export default withErrorApi(PersonPage);