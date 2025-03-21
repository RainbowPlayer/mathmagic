import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import bristarTimer from '../../include/timer'
import './styles.css'

export const TableMainBlock = () => {
  
  const { id } = useParams()

  interface TournamentTableRow {
    name: string
    rank: number
    score: number
  }
  
  const [tournamentTitle, setTournamentTitle] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [progress, setProgress] = useState(0)
  const [tournamentTable, setTournamentTable] = useState(Array<TournamentTableRow>)
  const [tournamentTableEmptyText, setTournamentTableEmptyText] = useState('Loading the tournament table...')

  const updateCallback = (tournamentTitle: string, progress: number, displayStr: string) => {
    setTournamentTitle(tournamentTitle)
    setProgress(Math.ceil(progress * 100))
    setDisplayText(displayStr)
  }

  const setTournamentTableCallback = (table: Array<TournamentTableRow>) => {
    setTournamentTable(table)
    setTournamentTableEmptyText('The tournament table will appear after the tournament starts.')
  }

  const bristarTimerRun = useRef(false)
  useEffect(() => {
    if (bristarTimerRun.current) return
    bristarTimer.init(id, 'en', setTournamentTableCallback, updateCallback)
    bristarTimerRun.current = true
  })

  return (
    <div className="table-container">
      <div className="table-header">
        <h4 className="table-title">{tournamentTitle}</h4>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <div className="timer-container">
          <span className="timer-text">
          { displayText }
          </span>
        </div>
        <div className="loader">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        </div>
      </div>

      {tournamentTable.length > 0 ? (
      <table className="score-table">
        <colgroup>
          <col className="col-25" />
          <col className="col-50" />
          <col className="col-25" />
        </colgroup>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {tournamentTable.map((row, index) => (
            <tr key={index}>
              <td>{row.rank}</td>
              <td>{row.name}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : 
        <div className="score-table">{tournamentTableEmptyText}</div>
      }
    </div>
  )
}
