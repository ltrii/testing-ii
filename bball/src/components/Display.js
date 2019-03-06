import React, { Component } from 'react'

export default class Display extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div className="gameDisplay">
          <div className="messages"><h2 className="prev">{this.props.prevMsg}</h2>
            <h2>
                {this.props.curMsg}
            </h2>
          </div>
          	<h4 data-testid="ball">
          		Balls: {this.props.ball}
          	</h4> 
            <h4 data-testid="strike">
                Strikes: {this.props.strike}
              </h4>
      </div>
    )
  }
}
