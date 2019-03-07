import React, { Component } from 'react'

export default class Dashboard extends Component {
  
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
      if(cur === 'hit'){
        this.props.handleHit('homerun');
      }
    }

    handleClick(e){
      e.preventDefault();
      const diceRoll = Math.floor((Math.random() * 1000) + 1);
      if(diceRoll <= 5){
          this.props.handleHit('homerun');
      }
      else if(diceRoll <= 45){
          this.props.addFoul();
      }
      else if(diceRoll <= 650){
          this.props.addStrike();
      }
      else if(diceRoll <= 700){
          this.props.addOut();
      }
      else if(diceRoll <= 910){
          this.props.addBall();
      } 
      else if(diceRoll <= 970){
          this.props.handleHit('single');
      }
      else if(diceRoll <= 990){
          this.props.handleHit('double');
      }
      else if(diceRoll <= 1000){
          this.props.handleHit('triple');
      }
  }
  render() {
    return (
      <div className="interact">
        <button onClick={(e => this.handleClick(e))}>Take a swing!</button>
        <div className="cheatButtons">
          <button data-testid="strikebtn" className="smallButton" onClick={(e => this.addNew('strike'))}>Add strike</button>
          <button data-testid="ballbtn" className="smallButton" onClick={(e => this.addNew('ball'))}>Add ball</button>
          <button data-testid="foulbtn" className="smallButton" onClick={(e => this.addNew('foul'))}>Add foul</button>
          <button data-testid="hitbtn" className="smallButton" onClick={(e => this.addNew('hit'))}>Hit a homer</button>
        </div>
      </div>
    )
  }
}
