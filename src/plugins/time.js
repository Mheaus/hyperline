import React from 'react';
import moment from 'moment';
import SvgIcon from '../components/SvgIcon';

class PluginIcon extends React.PureComponent {
  render() {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className="time-icon" transform="translate(1.000000, 1.000000)">
            <g>
              <path d="M0,0 L14,0 L14,14 L0,14 L0,0 Z M1,1 L13,1 L13,13 L1,13 L1,1 Z" />
              <path d="M6,2 L7,2 L7,7 L6,7 L6,2 Z M6,7 L10,7 L10,8 L6,8 L6,7 Z" />
            </g>
          </g>
        </g>

        <style jsx>{`
          .time-icon {
            fill: #3d3d3d;
          }
        `}</style>
      </SvgIcon>
    );
  }
}

export default class Time extends React.PureComponent {
  static displayName() {
    return 'time';
  }

  constructor(props) {
    super(props);

    this.state = {
      time: this.getCurrentTime(),
    };

    moment.locale('fr');
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCurrentTime = () => moment().format('MM/YY LTS');

  render() {
    const { time } = this.state;

    return (
      <div className="wrapper">
        <PluginIcon /> {time}
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}
