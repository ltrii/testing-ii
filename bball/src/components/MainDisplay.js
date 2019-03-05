import React, { Component } from 'react'
import Display from './Display';
import Dashboard from './Dashboard';


export default class MainDisplay extends Component {
    constructor(){
        super();
        this.state = {
            strike: 0,
            ball: 0,
            foul: false,
            out: false,
            hit: false,
            curMsg: 'Click to begin'
        }
        this.addBall = this.addBall.bind(this);
        this.addStrike = this.addStrike.bind(this);
        this.addFoul = this.addFoul.bind(this);
        this.handleHit = this.handleHit.bind(this);
    }

    componentDidUpdate(){
        if(this.state.strike >= 3){
            this.setState({
                out: true
            })
        }
        if(this.state.out){
            this.setState({
                curMsg: 'you are out',
                strike: 0,
                ball: 0,
                out: false
            })
        }
        if(this.state.ball > 3){
            this.setState({
            curMsg: 'Walk! Pretty much an out in this game',
            strike: 0,
            ball: 0
            })
        }
        if(this.state.foul){
            this.setState({
                curMsg: 'Foul ball',
                foul: false
            })
        }
    }

    addStrike() {
        this.setState({
            curMsg: 'Strike',
            strike: this.state.strike + 1
        })
    }

    addBall() {
        this.setState({
            curMsg: 'Ball',
            ball: this.state.ball + 1
        })
    }

    addFoul() {
        if(this.state.stike < 2){
            this.setState({
                strike: this.state.strike + 1
            })
        } else {
            this.setState({
                foul: true
            })
        }

    }
    handleHit() {
        this.setState({
            curMsg: 'Home run'
        })
    }
  render() {
    return (
      <div>
        <h1>Baseball</h1>
        <Display curMsg={this.state.curMsg} />
        <Dashboard 
            addStrike={this.addStrike}
            addBall={this.addBall}
            addFoul={this.addFoul}
            handleHit={this.handleHit} />
      </div>
    )
  }
}
