import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../../components/SvgIcon';

function calculateChargePoint(percent) {
  const base = 3.5;
  const val = Math.round((100 - percent) / 4.5);
  const point = base + val / 2;

  return val > 0 ? `M5,3 L11,3 L11,${point} L5,${point} L5,3 Z` : '';
}

function BatteryIcon({ charging, percentage }) {
  if (charging) {
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className="cpu-charging-icon">
            <path d="M9,10 L10,10 L10,9 L6,9 L6,10 L7,10 L7,13 L9,13 L9,10 Z M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,6 L11,6 L11,7 L5,7 L5,6 Z M5,7 L11,7 L11,8 L5,8 L5,7 Z M5,8 L11,8 L11,9 L5,9 L5,8 Z M9,4 L10,4 L10,6 L9,6 L9,4 Z M6,4 L7,4 L7,6 L6,6 L6,4 Z" />
          </g>
        </g>

        <style jsx>{`
          .cpu-charging-icon {
            fill: #3d3d3d;
          }
        `}</style>
      </SvgIcon>
    );
  }

  if (percentage <= 20) {
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

  const chargePoint = calculateChargePoint(percentage);

  return (
    <SvgIcon>
      <g fillRule="evenodd">
        <g className="cpu-discharging-icon">
          <path
            d={`M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z ${chargePoint}`}
          />
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

BatteryIcon.propTypes = {
  charging: PropTypes.bool,
  percentage: PropTypes.number,
};

export default BatteryIcon;
