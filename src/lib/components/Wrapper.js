import React from 'react';
import PropTypes from 'prop-types';

const style = {
  alignItems: 'center',
  display: 'flex',
  flexShrink: '0',
  padding: '0 0.5rem',
};

function Wrapper({ children, className }) {
  return (
    <div className={`wrapper${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

export default Wrapper;