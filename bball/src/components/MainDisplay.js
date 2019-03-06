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
            curMsg: 'Click to begin',
            prevMsg: ''
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
                prevMsg: this.state.curMsg,
                curMsg: 'you are out',
                strike: 0,
                ball: 0,
                out: false
            })
        }
        if(this.state.ball > 3){
            this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Walk! Pretty much an out in this game',
            strike: 0,
            ball: 0
            })
        }
        if(this.state.foul){
            this.setState({
                prevMsg: this.state.curMsg,
                curMsg: 'Foul ball',
                foul: false
            })
        }
    }

    addStrike() {
        this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Strike',
            strike: this.state.strike + 1
        })
    }

    addBall() {
        this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Ball',
            ball: this.state.ball + 1
        })
    }

    addFoul() {
        if(this.state.strike < 2){
            this.setState({
                prevMsg: this.state.curMsg,
                strike: this.state.strike + 1,
                curMsg: 'Foul ball! Strike!'
            })
        } else {
            this.setState({
                foul: true
            })
        }

    }
    handleHit() {
        this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Home run',
            strike: 0,
            ball: 0
        })
    }
  render() {
    return (
      <div>
        <h1>Baseball</h1>
        <div className="gameHold">
            <Display curMsg={this.state.curMsg}
                     ball={this.state.ball}
                     strike={this.state.strike}
                     prevMsg={this.state.prevMsg} />
            <Dashboard 
                addStrike={this.addStrike}
                addBall={this.addBall}
                addFoul={this.addFoul}
                handleHit={this.handleHit} />
        </div>
      </div>
    )
  }
}
