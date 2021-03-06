import React from 'react';
import PropTypes from 'prop-types';

import Transition from 'react-transition-group/Transition';

import CSSTransition from 'react-transition-group/CSSTransition';
const duration = 400;

const defaultStyle = {
  position:`absolute`,
  left:0,
  top:0,
  transition: `opacity ${duration}ms ease`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
};

const FadeTransition = ({...props ,children}) => (
    <Transition {...props} timeout={duration}>
      {(state) => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          {children}
        </div>
      )}
    </Transition>
  );

export default FadeTransition;