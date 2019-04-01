import React from 'react';
import PropTypes from 'prop-types';

const style = {
  fill: '#3d3d3d',
  height: '1rem',
  marginRight: '0.5rem',
  width: '1rem',
};

function SvgIcon({ children }) {
  return (
    <svg className="icon" style={style} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

SvgIcon.propTypes = {
  children: PropTypes.element,
};

export default SvgIcon;
