import React, { Component } from 'react'

export default class Display extends Component {

  render() {
    return (
      <div className="gameDisplay">
          <div className="messages">
          <div className="prev">
            {this.props.prevMsg}
          </div>
            <h2>
                {this.props.curMsg}
            </h2>
          </div>
          <div>
            <h3>Currently up: {this.props.inHalf}</h3>
            <h3>Away: {this.props.awayScore}</h3>
            <h3>Home: {this.props.homeScore}</h3>
            <h4>Inning: {this.props.inning}</h4>
          	<h4 data-testid="ball">
          		Balls: {this.props.ball}
          	</h4> 
            <h4 data-testid="strike">
                Strikes: {this.props.strike}
              </h4>
            <h4>
              Outs: {this.props.outs}
            </h4>
        </div>
      </div>
    )
  }
}
