import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../../components/SvgIcon';

class Draining extends React.PureComponent {
  calculateChargePoint = percent => {
    const base = 3.5;
    const val = Math.round((100 - percent) / 4.5);
    const point = base + val / 2;

    return val > 0 ? `M5,3 L11,3 L11,${point} L5,${point} L5,3 Z` : '';
  };

  render() {
    const { percentage } = this.props;
    const chargePoint = this.calculateChargePoint(percentage);

    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className="cpu-discharging-icon">
            <path d={`M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z ${chargePoint}`} />
          </g>
        </g>

        <style jsx>{`
          .cpu-discharging-icon {
            fill: #3d3d3d;
          }
        `}</style>
      </SvgIcon>
    );
  }
}

Draining.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Draining;
