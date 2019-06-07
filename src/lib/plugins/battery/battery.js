import React from 'react';
import leftPad from 'left-pad';
import Critical from './critical';
import Charging from './charging';
import Draining from './draining';

class Battery extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      charging: false,
      percentage: '--',
    };

    this.batteryEvents = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];
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

    const BatteryIcon = () => {
      if (charging) {
        return <Charging />;
      }

      if (Number(percentage) <= 20) {
        return <Critical />;
      }

      return <Draining percentage={Number(percentage)} />;
    };

    return (
      <div className="wrapper">
        <BatteryIcon /> {leftPad(percentage, 2, 0)}%
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

export default Battery;
