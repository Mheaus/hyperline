import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: PropTypes.array.isRequired
    }
  }

  render() {
    const { plugins, ...props } = this.props

    return (
      <div className="line" {...props}>
        {plugins.map((Component, index) => (
          <div key={index} className="wrapper">
            <Component />
          </div>
        ))}

        <style jsx>{`
          .line {
            align-items: center;
            background: rgba(0, 0, 0, 0.08);
            bottom: 0;
            display: flex;
            color: #3d3d3d;
            font: bold 10px Monospace;
            height: 18px;
            margin: 2px 0;
            overflow: hidden;
            padding: 0 10px;
            pointer-events: none;
            position: absolute;
            width: 100%;
          }
          .wrapper {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
