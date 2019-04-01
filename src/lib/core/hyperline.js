import React from 'react';
import PropTypes from 'prop-types';

import decorate from 'hyper/decorate'; // eslint-disable-line

import Wrapper from '../components/Wrapper';

const style = {
  alignItems: 'center',
  background: '#e9e9e9',
  bottom: '0',
  color: '#3d3d3d',
  display: 'flex',
  fontFamily: 'Helvetica Neue',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  height: '1.5rem',
  margin: '0',
  overflow: 'hidden',
  padding: '0 0.5rem',
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
};

function HyperLine(props) {
  const { plugins } = props;

  return (
    <div className="hyperline" style={style}>
      {plugins.map(Plugin => (
        <Wrapper key={Math.random()}>
          <Plugin />
        </Wrapper>
      ))}
    </div>
  );
}

HyperLine.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.element),
};

export default decorate(HyperLine, 'HyperLine');
