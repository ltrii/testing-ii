import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    handleClick(e){
        e.preventDefault();
        const diceRoll = Math.floor((Math.random() * 100) + 1);
        if(diceRoll <= 5){
            this.props.handleHit();
        }
        else if(diceRoll <= 20){
            this.props.addFoul();
        }
        else if(diceRoll <= 53){
            this.props.addStrike();
        }
        else if(diceRoll <= 86){
            this.props.addBall();
        } else if(diceRoll <= 100){
            this.props.addStrike();
        }
    }
  render() {
    return (
      <div>
        <button onClick={(e => this.handleClick(e))}>Take a swing!</button>
      </div>
    )
  }
}
