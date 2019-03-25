import React from 'react';
import SvgIcon from '../../utils/svg-icon';

export default class Critical extends React.PureComponent {
  render() {
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className="cpu-critical-icon">
            <path d="M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,3 L11,3 L11,11 L5,11 L5,3 Z" />
          </g>
        </g>

        <style jsx>{`
          .cpu-critical-icon {
            fill: #3d3d3d;
          }
        `}</style>
      </SvgIcon>
    );
  }
}
