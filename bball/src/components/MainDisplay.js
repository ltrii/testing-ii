import React, { Component } from 'react'
import Display from './Display';
import Dashboard from './Dashboard';
import WinLog from './WinLog';
import Bases from './Bases';


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
            curMsg: 'Click button below',
            prevMsg: '',
            awayScore: 0,
            homeScore: 0,
            b1: 0,
            b2: 0,
            b3: 0,
            extraInnings: 0,
            extraInit: false,
            winLog: []
        }
        this.addBall = this.addBall.bind(this);
        this.addStrike = this.addStrike.bind(this);
        this.addFoul = this.addFoul.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.addOut = this.addOut.bind(this);
    }

    componentDidMount(){
        const logs = JSON.parse(localStorage.getItem('gamelogs'));
        if(logs){
            console.log(logs)
            this.setState({
                winLog: logs
            })
        } else {
            console.log('No Winlog Found')
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.winLog.length !== this.state.winLog.length){
            const jsond = JSON.stringify(this.state.winLog);
            localStorage.setItem('gamelogs', jsond);
        }
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
            if (this.state.inHalf === 'away'){
                if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 0
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk! 1 Run!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        awayScore: this.state.awayScore + 1
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1
                    })
                } else {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 0,
                        b3: 0
                    })
                }
            } else if (this.state.inHalf === 'home') {
                if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 0
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk! 1 Run!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        homeScore: this.state.homeScore + 1
                    })
                } else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1) {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 1,
                        b3: 1
                    })
                } else {
                    this.setState({
                        prevMsg: this.state.curMsg,
                        curMsg: 'Walk!',
                        strike: 0,
                        ball: 0,
                        b1: 1,
                        b2: 0,
                        b3: 0
                    })
                }
            }
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
                    outs: 0,
                    ball: 0,
                    strike: 0,
                    b1: 0,
                    b2: 0,
                    b3: 0,
                    curMsg: 'Home up'
                 })
          } else if (this.state.inHalf === 'home') {
              if(this.state.extraInit === true && this.state.awayScore > this.state.homeScore) {
                  this.setState({
                    winLog: [...this.state.winLog, ({
                        Away: this.state.awayScore,
                        Home: this.state.homeScore,
                        Innings: this.state.inning
                    })],
                    curMsg: 'Game Over! Away Team Wins!',
                    inning: 1,
                    b1: 0,
                    b2: 0,
                    b3: 0,
                    outs: 0,
                    ball: 0,
                    strike: 0,
                    awayScore: 0,
                    homeScore: 0,
                    inHalf: 'away',
                    extraInit: false
                  });
              } else {
                    this.setState({
                        inHalf: 'away',
                        inning: this.state.inning + 1,
                        outs: 0,
                        ball: 0,
                        strike: 0,
                        b1: 0,
                        b2: 0,
                        b3: 0,
                        curMsg: 'Away up'
                        })
                }
         }
        }

        if(this.state.inning === 9 && this.state.inHalf === 'home' && this.state.homeScore > this.state.awayScore) {
            this.setState({
                winLog: [...this.state.winLog, ({
                    Away: this.state.awayScore,
                    Home: this.state.homeScore,
                    Innings: this.state.inning
                })],
                curMsg: 'Game Over! Home Team Wins!',
                inning: 1,
                b1: 0,
                b2: 0,
                b3: 0,
                outs: 0,
                ball: 0,
                strike: 0,
                awayScore: 0,
                homeScore: 0,
                inHalf: 'away',
                extraInit: false
              })
        }

        if(this.state.inning >= 10){
            if(this.state.homeScore !== this.state.awayScore && this.state.extraInit !== true) {
                if(this.state.homeScore > this.state.awayScore){
                    this.setState({
                        winLog: [...this.state.winLog, ({
                            Away: this.state.awayScore,
                            Home: this.state.homeScore,
                            Innings: 9
                        })],
                        curMsg: 'Game Over! Home Team Wins!',
                        inning: 1,
                        outs: 0,
                        b1: 0,
                        b2: 0,
                        b3: 0,
                        awayScore: 0,
                        homeScore: 0,
                        inHalf: 'away',
                        extraInit: false
                    })
                } else if(this.state.homeScore < this.state.awayScore){
                    this.setState({
                        winLog: [...this.state.winLog, ({
                            Away: this.state.awayScore,
                            Home: this.state.homeScore,
                            Innings: 9
                        })],
                        curMsg: 'Game Over! Away Team Wins!',
                        outs: 0,
                        b1: 0,
                        b2: 0,
                        b3: 0,
                        inning: 1,
                        awayScore: 0,
                        homeScore: 0,
                        inHalf: 'away',
                        extraInit: false
                    })
                }
            }
            if(this.state.homeScore === this.state.awayScore && this.state.extraInit === false){
                this.setState({
                    extraInit: true,
                    extraInnings: 1
                }) 
            } else if (this.state.homeScore !== this.state.awayScore && this.state.extraInit === true && this.state.inHalf === 'home'){
                    if(this.state.homeScore > this.state.awayScore){
                        this.setState({
                            winLog: [...this.state.winLog, ({
                                Away: this.state.awayScore,
                                Home: this.state.homeScore,
                                Innings: this.state.inning
                            })],
                            curMsg: 'Game Over! Home Team Wins!',
                            outs: 0,
                            b1: 0,
                            b2: 0,
                            b3: 0,
                            inning: 1,
                            awayScore: 0,
                            homeScore: 0,
                            inHalf: 'away',
                            extraInit: false
                        })
                    }
            } 
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

    addOut() {
        this.setState({
            prevMsg: this.state.curMsg,
            curMsg: 'Ball Caught! Out!',
            ball: 0,
            strike: 0,
            outs: this.state.outs + 1
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
    handleHit(type) {
        if(this.state.inHalf === 'away'){
            if(type === 'single'){
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 0,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 0,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
            } else if (type === 'double') {
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        ball: 0,
                        strike: 0,
                        curMsg: 'Double hit'
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        curMsg: 'Double hit',
                        ball: 0,
                        strike: 0
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 2 Runs',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 2 Runs',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
            } else if (type === 'triple') {
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        curMsg: 'Triple hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 1 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 2
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 3 Runs!',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 3
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 1 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        awayScore: this.state.awayScore + 2
                    });
                } 
            } else if (type === 'homerun') {
                const runsIn = this.state.b1 + this.state.b2 + this.state.b3 + 1;
                this.setState({
                    prevMsg: this.state.curMsg,
                    curMsg: `Home Run! ${runsIn} runs!`,
                    strike: 0,
                    ball: 0,
                    b1: 0,
                    b2: 0,
                    b3: 0,
                    awayScore: this.state.awayScore + runsIn
                })
            }
        }
        else if (this.state.inHalf === 'home'){
            if(type === 'single'){
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 0,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 0,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        curMsg: 'Single hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 0,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 1,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Single Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
            } else if (type === 'double') {
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        curMsg: 'Double hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        curMsg: 'Double hit',
                        ball: 0,
                        strike: 0
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 2 Runs',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 2 Runs',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 0,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 1,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Double - 1 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
            } else if (type === 'triple') {
                if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        curMsg: 'Triple hit',
                        ball: 0,
                        strike: 0
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 1 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 0){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 2
                    });
                }
                else if(this.state.b1 === 1 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 3 Runs!',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 3
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 1 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 2
                    });
                } 
                else if(this.state.b1 === 0 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 1 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 1
                    });
                } 
                else if(this.state.b1 === 1 && this.state.b2 === 0 && this.state.b3 === 1){
                    this.setState({
                        b1: 0,
                        b2: 0,
                        b3: 1,
                        prevMsg: this.state.curMsg,
                        curMsg: 'Triple - 2 Run',
                        strike: 0,
                        ball: 0,
                        homeScore: this.state.homeScore + 2
                    });
                } 
            } else if (type === 'homerun') {
                const runsIn = this.state.b1 + this.state.b2 + this.state.b3 + 1;
                this.setState({
                    prevMsg: this.state.curMsg,
                    curMsg: `Home Run! ${runsIn} runs!`,
                    strike: 0,
                    ball: 0,
                    b1: 0,
                    b2: 0,
                    b3: 0,
                    homeScore: this.state.homeScore + runsIn
                })
            }
        }
    }
  render() {
    return (
      <div>
        <h1>Baseball</h1>
        <div className="gameHold">
            <div className="rightContent">
                <Display curMsg={this.state.curMsg}
                         ball={this.state.ball}
                         strike={this.state.strike}
                         prevMsg={this.state.prevMsg} 
                         homeScore={this.state.homeScore}
                         awayScore={this.state.awayScore}
                         inning={this.state.inning}
                         outs={this.state.outs}
                         inHalf={this.state.inHalf} />
            </div>
                <div className="leftContent">
                    <Bases b1={this.state.b1}
                       b2={this.state.b2}
                       b3={this.state.b3} />
                    <Dashboard 
                        addStrike={this.addStrike}
                        addBall={this.addBall}
                        addFoul={this.addFoul}
                        handleHit={this.handleHit}
                        addOut={this.addOut} />
                </div>

        </div>
        <WinLog winLog={this.state.winLog} />
      </div>
    )
  }
}
