import { useNavigate } from 'react-router';
import IconBack from './img/arrow-left.svg';

import cl from './PersonLinkBack.module.scss';


const PersonLinkBack = () => {

  const history = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();
    history(-1);
  }

  return (
    <a 
      href="#"
      onClick={handleGoBack}
      className={cl.link}
    >
      <IconBack className={cl.link__img}/>
      <span>Go back</span>
    </a>
  )
}

export default PersonLinkBack;