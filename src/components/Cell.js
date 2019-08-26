import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <td onContextMenu={this.props.rightClick} onClick={this.props.leftClick}>
        {this.props.display}
      </td>
    )
  }
}
export default Cell
