import ip from './ip';
import memory from './memory';
import Cpu from './Cpu';
import network from './network';
import time from './time';
import docker from './docker';

// import hostname from './hostname'
// Import Uptime from './uptime'
import Battery from './Battery';

export default [time, Battery, ip, memory, Cpu, network, docker];
