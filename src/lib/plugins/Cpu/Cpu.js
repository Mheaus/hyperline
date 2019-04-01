import React from 'react';
import { currentLoad as getCurrentCPULoad } from 'systeminformation';

import CpuIcon from './CpuIcon';

class Cpu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cpuLoad: 0,
    };

    this.style = {
      display: 'flex',
      alignItems: 'center',
    };

    this.interval = () => {};
  }

  componentDidMount() {
    this.getCpuLoad();
    this.interval = setInterval(() => this.getCpuLoad(), 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async getCpuLoad() {
    const { currentload } = await getCurrentCPULoad();

    this.setState({
      cpuLoad: currentload.toFixed(2),
    });
  }

  render() {
    const { cpuLoad } = this.state;

    return (
      <div className="cpu" style={this.style}>
        <CpuIcon />
        {` ${cpuLoad}`}
      </div>
    );
  }
}

export default Cpu;
