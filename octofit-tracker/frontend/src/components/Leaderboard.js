import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://upgraded-meme-pvw9v4wv6v93994w-8000.app.github.dev/api/leaderboard/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Sort by score in descending order
        const sortedData = [...data].sort((a, b) => b.score - a.score);
        setLeaderboard(sortedData);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching leaderboard: ${error.message}`);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Function to get position badge styling
  const getPositionBadgeClass = (position) => {
    switch(position) {
      case 1:
        return 'bg-warning text-dark';
      case 2:
        return 'bg-secondary text-white';
      case 3:
        return 'bg-danger text-white';
      default:
        return 'bg-light text-dark';
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-trophy me-2"></i>
          OctoFit Leaderboard
        </h2>
        <div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary active">
              <i className="bi bi-calendar-week me-1"></i> Weekly
            </button>
            <button type="button" className="btn btn-outline-primary">
              <i className="bi bi-calendar-month me-1"></i> Monthly
            </button>
            <button type="button" className="btn btn-outline-primary">
              <i className="bi bi-calendar me-1"></i> All-Time
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {leaderboard.length > 0 && leaderboard.slice(0, 3).map((entry, index) => (
          <div key={entry._id} className="col-md-4">
            <div className={`card mb-4 mb-md-0 ${index === 0 ? 'border-warning' : index === 1 ? 'border-secondary' : 'border-danger'}`}>
              <div className={`card-header text-center ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary text-white' : 'bg-danger text-white'}`}>
                <h5 className="mb-0">
                  {index === 0 ? (
                    <i className="bi bi-trophy-fill me-2"></i>
                  ) : (
                    <i className="bi bi-award me-2"></i>
                  )}
                  {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Place
                </h5>
              </div>
              <div className="card-body text-center">
                <div className={`avatar-circle mx-auto mb-3 ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary text-white' : 'bg-danger text-white'}`} style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                  {entry.user && typeof entry.user === 'object' ? entry.user.username.charAt(0).toUpperCase() : '?'}
                </div>
                <h4 className="card-title">
                  {entry.user ? (typeof entry.user === 'object' ? entry.user.username : entry.user) : 'Unknown User'}
                </h4>
                <p className="display-4 fw-bold mb-0">{entry.score}</p>
                <p className="text-muted">points</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Full Rankings</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" width="10%">Rank</th>
                  <th scope="col" width="50%">User</th>
                  <th scope="col" width="30%">Score</th>
                  <th scope="col" width="10%">Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={entry._id} className={index < 3 ? 'table-active' : ''}>
                      <td>
                        <span className={`badge rounded-pill ${getPositionBadgeClass(index + 1)}`}>
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-primary text-white me-2">
                            {entry.user && typeof entry.user === 'object' ? entry.user.username.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <strong>{entry.user ? (typeof entry.user === 'object' ? entry.user.username : entry.user) : 'Unknown User'}</strong>
                            <br/>
                            <small className="text-muted">Member since 2025</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="progress">
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{width: `${Math.min(100, (entry.score / (leaderboard[0]?.score || 100)) * 100)}%`}} 
                            aria-valuenow={entry.score} 
                            aria-valuemin="0" 
                            aria-valuemax={leaderboard[0]?.score || 100}
                          >
                            {entry.score} pts
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="bi bi-dash text-muted"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="alert alert-info mb-0">
                        No leaderboard entries found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;