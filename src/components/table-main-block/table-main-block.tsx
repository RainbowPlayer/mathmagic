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

  return (
    <div className="table-container">
      <div className="table-header">
        <h4 className="table-title">Best Alabama School - Summer 2025</h4>

        <div className="timer-container">
          <span className="timer-text">Timer</span>
          <span className="timer-text"></span>
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
