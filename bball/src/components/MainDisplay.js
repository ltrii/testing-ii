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
            outs: 0,
            hit: false,
            inning: 1,
            inHalf: 'away',
            curMsg: 'Click to begin',
            prevMsg: '',
            awayScore: 0,
            homeScore: 0
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
                curMsg: 'Out!',
                strike: 0,
                ball: 0,
                out: false,
                outs: this.state.outs + 1
            })
        }
        if(this.state.ball > 3){
            this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Walk! (but really just an out)',
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
        if(this.state.outs >= 3){
            if(this.state.inHalf === 'away') {
                this.setState({
                    inHalf: 'home',
                    outs: 0
                 })
          } else if (this.state.inHalf === 'home') {
             this.setState({
                 inHalf: 'away',
                 inning: this.state.inning + 1,
                 outs: 0
                  })
         }
        }
        if(this.state.inning > 9){
            this.setState({
                curMsg: 'Game over!',
                inning: 1
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
        if(this.state.inHalf === 'away'){
            this.setState({
                prevMsg: this.state.curMsg,
                curMsg: 'Home run',
                strike: 0,
                ball: 0,
                awayScore: this.state.awayScore + 1
            })
        }
        else if (this.state.inHalf === 'home'){
            this.setState({
                prevMsg: this.state.curMsg,
                curMsg: 'Home run',
                strike: 0,
                ball: 0,
                homeScore: this.state.homeScore + 1
            })
        }
    }
  render() {
    return (
      <div>
        <h1>Baseball</h1>
        <div className="gameHold">
            <Display curMsg={this.state.curMsg}
                     ball={this.state.ball}
                     strike={this.state.strike}
                     prevMsg={this.state.prevMsg} 
                     homeScore={this.state.homeScore}
                     awayScore={this.state.awayScore}
                     inning={this.state.inning}
                     outs={this.state.outs} />
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
