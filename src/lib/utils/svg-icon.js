import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'

export default class SvgIcon extends Component {
  static propTypes() {
    return {
      children: PropTypes.element.isRequired
    }
  }

  render() {
    return (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg">
        {this.props.children}

        <style jsx>{`
          .icon {
            fill: #3d3d3d;
            height: 16px;
            margin-right: 7px;
            width: 16px;
          }
        `}</style>
      </svg>
    )
  }
}
