import React from 'react';
import PropTypes from 'prop-types';

const defaultStyle = {
  alignItems: 'center',
  display: 'flex',
  flexShrink: '0',
  padding: '0 0.5rem',
};

function Wrapper({ children, className, style }) {
  return (
    <div
      className={`wrapper${className ? ` ${className}` : ''}`}
      style={{ ...defaultStyle, ...style }}
    >
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  className: '',
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

export default Wrapper;
