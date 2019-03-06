import React from 'react'

export default function WinLog(props) {
  return (
    <div>
        <h1>Win Logs</h1>
      {props.winLog.map(game => (
          <div>
              <h4>
                  Home Score: {game.Home}
              </h4>
              <h4>
                  Away Score: {game.Away}
              </h4>
              Innings: {game.Innings}
          </div>
      ))}
    </div>
  )
}
