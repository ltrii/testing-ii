import React, { Component } from 'react'

export default class Bases extends Component {

    renderb1(){
        if(this.props.b1 === 1){
            return (
                <div id="b1" className="base onbase">
                B1</div>
            )
        } else {
            return (
                <div id="b1" className="base">
                B1</div>
            )
        }
    }
    renderb2(){
        if(this.props.b2 === 1){
            return (
                <div id="b2" className="base onbase">
                B2</div>
            )
        } else {
            return (
                <div id="b2" className="base">
                B2</div>
            )
        }
    }
    renderb3(){
        if(this.props.b3 === 1){
            return (
                <div id="b3" className="base onbase">
                B3</div>
            )
        } else {
            return (
                <div id="b3" className="base">
                B3</div>
            )
        }
    }
  render() {
    return (
    <div className="baseHold">
        {this.renderb1()}
        {this.renderb2()}
        {this.renderb3()}
      </div>
    )
  }
}
