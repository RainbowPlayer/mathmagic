import React, { useState, useEffect, useMemo } from 'react';
import './styles.css';

export const TableMainBlock = () => {
  const tableData = [
    { place: 1, player: 'Player', rank: 71 },
    { place: 2, player: 'Player', rank: 63 },
    { place: 3, player: 'Player', rank: 60 },
    { place: 1, player: 'Player', rank: 71 },
    { place: 2, player: 'Player', rank: 63 },
    { place: 3, player: 'Player', rank: 60 },
    { place: 1, player: 'Player', rank: 71 },
    { place: 2, player: 'Player', rank: 63 },
    { place: 3, player: 'Player', rank: 60 },
    { place: 1, player: 'Player', rank: 71 },
    { place: 2, player: 'Player', rank: 63 },
    { place: 3, player: 'Player', rank: 60 },
  ];

  interface TimeLeft {
    days?: number;
    hours?: number;
    min?: number;
    sec?: number;
  }

  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / (1000 * 60)) % 60),
        sec: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = (Object.keys(timeLeft) as (keyof TimeLeft)[]).map(
    (interval) => (
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    ),
  );

  const totalDuration = 7 * 24 * 60 * 60 * 1000;
  const nowTime = new Date().getTime();
  const timeDifference = targetDate.getTime() - nowTime;
  const progressPercentage =
    timeDifference > 0 ? 100 - (timeDifference / totalDuration) * 100 : 100;

  return (
    <div className="table-container">
      <div className="table-header">
        <h4 className="table-title">Best Alabama School - Summer 2025</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className="timer-container">
            <span className="timer-text">
              {timerComponents.length ? timerComponents : "Time's up!"}
            </span>
          </div>
          <div className="loader">
            <div
              className="progress"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <table className="score-table">
        <colgroup>
          <col className="col-25" />
          <col className="col-50" />
          <col className="col-25" />
        </colgroup>

        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.place}</td>
              <td>{row.player}</td>
              <td>{row.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
