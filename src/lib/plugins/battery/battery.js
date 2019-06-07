import React, { PureComponent } from 'react';

import Wrapper from '../../components/Wrapper';
import BatteryIcon from './BatteryIcon';

class Battery extends PureComponent {
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

  handleEvent = event => this.setBatteryStatus(event.target);

  render() {
    const { charging, percentage } = this.state;

    return (
      <Wrapper style={{ padding: '0' }}>
        <BatteryIcon charging={charging} percentage={Number(percentage)} /> {percentage}%
      </Wrapper>
    );
  }
}

export default Battery;
