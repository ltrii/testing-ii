import React, { Component } from 'react'

export default class Display extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div>
          {this.props.curMsg}
      </div>
    )
  }
}
