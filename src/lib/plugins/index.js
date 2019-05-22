import cpu from './cpu';
import docker from './docker';
import gitlab from './gitlab';
import ip from './ip';
import memory from './memory';
import network from './network';
import time from './time';

// import hostname from './hostname'
// Import Uptime from './uptime'
// import Battery from './Battery';

export default [[time, ip, memory, cpu, network, docker], [gitlab]];
