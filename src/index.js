import { exec } from 'child_process';
import PropTypes from 'prop-types';

import { getHyperlineConfig } from './utils/config';
import HyperLine from './core/hyperline';
import plugins from './plugins';

let cwd;

let lastPid;

const setCwd = (pid = lastPid) => {
  exec(`lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9-`, (err, stdout) => {
    cwd = stdout.trim();
  });
};

exports.decorateHyper = (Hyper, { React }) => {
  class DecorateHyper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        cwd: '',
      };

      this.config = getHyperlineConfig();

      this.plugins = this.config.plugins
        .replace('[[', '')
        .replace(']]', '')
        .split('], [')
        .map(pluginList => pluginList.split(', ').map(pluginName => plugins[pluginName]));
    }

    componentDidMount() {
      this.interval = setInterval(() => {
        // eslint-disable-next-line
        if (this.state.cwd !== cwd) {
          this.setState({
            cwd,
          });
        }
      }, 500);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      const { customChildren } = this.props;

      return React.createElement(Hyper, {
        ...this.props,
        customInnerChildren: [customChildren, React.createElement(HyperLine, { plugins: this.plugins, ...this.state })],
      });
    }
  }

  DecorateHyper.propTypes = {
    customChildren: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  };

  return DecorateHyper;
};

exports.middleware = store => next => action => {
  const uids = store.getState().sessions.sessions;
  const { pid } = uids[action.uid] || {};

  if (pid) {
    lastPid = pid;
  }

  switch (action.type) {
    case 'SESSION_ADD':
      setCwd(pid);
      break;
    case 'SESSION_ADD_DATA':
      if (action.data.indexOf('\n') > 0) {
        setCwd(pid);
      }
      break;
    case 'SESSION_SET_ACTIVE':
      setCwd(pid);
      break;
    default:
      break;
  }

  next(action);
};
