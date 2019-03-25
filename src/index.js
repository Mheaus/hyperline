import PropTypes from 'prop-types';

import HyperLine from './lib/core/hyperline';
import plugins from './lib/plugins';

// exports.decorateConfig = config => ({
//   ...config,
//   css: `
//     ${config.css}
//
//
//   `,
// });

exports.decorateHyper = (Hyper, { React }) => {
  class DecorateHyper extends React.PureComponent {
    render() {
      const { customChildren } = this.props;

      return React.createElement(
        Hyper,
        Object.assign({}, this.props, {
          customInnerChildren: [
            customChildren,
            React.createElement(HyperLine, { plugins }),
          ],
        })
      );
    }
  }

  DecorateHyper.propTypes = {
    customChildren: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  return DecorateHyper;
};
