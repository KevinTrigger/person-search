import PropTypes from 'prop-types';

import { useCallback, useEffect, useState } from 'react';
import { getApiResourse } from '@utils/network';
import { withErrorApi } from '@hoc-helpers/withErrorApi';
import { API_SEARCH } from '@constants/api';
import { getPeopleId, getPeopleImage } from '@services/getPeopleData';

import { debounce } from 'lodash';

import SearchPageInfo from '@components/SearchPage/SearchPageInfo';

import cl from './SearchPage.module.scss';

const SearchPage = ({ setErrorApi }) => {

  const [inputValue, setInputValue] = useState('');
  const [people, setPeople] = useState([]);

  const debouncedGetResponse = useCallback(
    debounce(value => getResponse(value), 500),
    []
  )

  const getResponse = async param => {
    const response = await getApiResourse(API_SEARCH + param);
    
    if (response) {
      const peopleList = response.results.map(({name, url}) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);

        return {
          id,
          name,
          img
        }
      })
      setPeople(peopleList);
      setErrorApi(false);
    } else {
      setErrorApi(true);
    }
    
  }

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);
    debouncedGetResponse(value);
  }

  useEffect(() => {
    getResponse('');
  }, [])

  return (
    <div>
        <h1 className='header__text'>Search</h1>
        <input 
            type="search" 
            placeholder='write a name hero'
            value={inputValue}
            onChange={handleInputChange}
        />
        <SearchPageInfo people={people}/>
    </div>
  )
}

SearchPage.propTypes = {
  setErrorApi: PropTypes.func,
}

export default withErrorApi(SearchPage);