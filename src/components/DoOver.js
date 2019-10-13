import React, { Component } from 'react'

class DoOver extends Component {
  render() {
    return (
      <section className="DoOver">
        <button onClick={() => this.props.doOver()}>Try Again?</button>
      </section>
    )
  }
}

export default DoOver
