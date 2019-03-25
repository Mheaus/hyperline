import React from 'react';
import PropTypes from 'prop-types';

import decorate from 'hyper/decorate'; // eslint-disable-line

function HyperLine(props) {
  const { plugins } = props;

  return (
    <div className="line" {...props}>
      {plugins.map(Plugin => (
        <div className="wrapper">
          <Plugin />
        </div>
      ))}

      <style jsx>{`
        .line {
          align-items: center;
          background: #e9e9e9;
          bottom: 0;
          display: flex;
          color: #3d3d3d;
          font: bold 10px Monospace;
          height: 18px;
          margin: 0;
          overflow: hidden;
          padding: 0 10px;
          pointer-events: none;
          position: absolute;
          width: 100%;
        }
        .wrapper {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding-left: 10px;
          padding-right: 10px;
        }
      `}</style>
    </div>
  );
}

HyperLine.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.element),
};

export default decorate(HyperLine, 'HyperLine');
