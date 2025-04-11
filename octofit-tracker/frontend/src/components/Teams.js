import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://upgraded-meme-pvw9v4wv6v93994w-8000.app.github.dev/api/teams/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching teams: ${error.message}`);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading teams...</p>
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
    <div className="teams-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-people-fill me-2"></i>
          OctoFit Teams
        </h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Create Team
        </button>
      </div>

      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="col-lg-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{team.name}</h5>
                  <div className="dropdown">
                    <button className="btn btn-sm btn-light" type="button" id={`team-options-${team._id}`} data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`team-options-${team._id}`}>
                      <li><button className="dropdown-item" type="button"><i className="bi bi-pencil me-2"></i>Edit Team</button></li>
                      <li><button className="dropdown-item" type="button"><i className="bi bi-person-plus me-2"></i>Add Member</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item text-danger" type="button"><i className="bi bi-trash me-2"></i>Delete Team</button></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-3 text-muted">Team Members</h6>
                  <ul className="list-group list-group-flush">
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <i className="bi bi-person-circle me-2"></i>
                            {typeof member === 'object' ? member.username : member}
                          </div>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-center text-muted">No team members</li>
                    )}
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted">
                    <i className="bi bi-people me-1"></i>
                    {team.members ? team.members.length : 0} members
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>
              No teams found. Click "Create Team" to get started!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;