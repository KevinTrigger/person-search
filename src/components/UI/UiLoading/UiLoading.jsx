import PropTypes from 'prop-types';
import cl from './UiLoading.module.scss';
import cn from 'classnames';

import LoaderBlack from './img/loader-black.svg';
import LoaderWhite from './img/loader-white.svg';
import LoaderBlue from './img/loader-blue.svg';


const loaders = {
  white: LoaderWhite,
  blue: LoaderBlue,
  black: LoaderBlack,
}

const UiLoading = ({
    theme = 'white',
    isShadow = true,
  }) => {

    const Loader = loaders[theme]
    console.log(Loader);
      return (
        <>
          {Loader && <Loader className={cn(cl.loader, isShadow && cl.shadow)}/>}
        </>
    )
}

UiLoading.propTypes = {
  theme: PropTypes.string,
  isShadow: PropTypes.bool,
  classes: PropTypes.string,
}

export default UiLoading;