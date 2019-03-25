import React from 'react';
import leftPad from 'left-pad';
import BatteryIcon from './battery-icon';

export default class Battery extends React.PureComponent {
  static displayName() {
    return 'battery';
  }

  constructor(props) {
    super(props);

    this.state = {
      charging: false,
      percentage: '--',
    };

    this.batteryEvents = [
      'chargingchange',
      'chargingtimechange',
      'dischargingtimechange',
      'levelchange',
    ];
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    navigator.getBattery().then(battery => {
      this.setBatteryStatus(battery);

      this.batteryEvents.forEach(event => {
        battery.addEventListener(event, this.handleEvent, false);
      });
    });
  }

  componentWillUnmount() {
    navigator.getBattery().then(battery => {
      this.batteryEvents.forEach(event => {
        battery.removeEventListener(event, this.handleEvent);
      });
    });
  }

  setBatteryStatus(battery) {
    this.setState({
      charging: battery.charging,
      percentage: Math.floor(battery.level * 100),
    });
  }

  handleEvent(event) {
    this.setBatteryStatus(event.target);
  }

  render() {
    const { charging, percentage } = this.state;

    return (
      <div className="wrapper">
        <BatteryIcon charging={charging} percentage={Number(percentage)} />{' '}
        {leftPad(percentage, 2, 0)}%
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
