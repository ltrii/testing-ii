import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    addNew(cur){
      if(cur === 'strike'){
        this.props.addStrike();
      }
      if(cur === 'ball'){
        this.props.addBall();
      }
      if(cur === 'foul'){
        this.props.addFoul();
      }
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
        <button data-testid="strikebtn" className="smallButton" onClick={(e => this.addNew('strike'))}>Add strike</button>
        <button data-testid="ballbtn" className="smallButton" onClick={(e => this.addNew('ball'))}>Add ball</button>
        <button data-testid="foulbtn" className="smallButton" onClick={(e => this.addNew('foul'))}>Add foul</button>
      </div>
    )
  }
}
