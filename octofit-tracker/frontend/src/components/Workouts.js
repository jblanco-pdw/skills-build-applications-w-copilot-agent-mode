import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('https://upgraded-meme-pvw9v4wv6v93994w-8000.app.github.dev/api/workouts/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching workouts: ${error.message}`);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading workouts...</p>
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
    <div className="workouts-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-lightning-charge me-2"></i>
          OctoFit Workouts
        </h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Create Workout
        </button>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="list-group sticky-top" style={{ top: '1rem' }}>
            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
              <i className="bi bi-grid-3x3-gap me-2"></i> All Workouts
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              <i className="bi bi-heart-pulse me-2"></i> Cardio
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              <i className="bi bi-bicycle me-2"></i> Cycling
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              <i className="bi bi-droplet me-2"></i> Swimming
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              <i className="bi bi-universal-access me-2"></i> Crossfit
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              <i className="bi bi-trophy me-2"></i> Competitions
            </button>
            <hr />
            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-star-fill me-2 text-warning"></i> Favorite Workouts</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </button>
            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-clock-history me-2"></i> Recent Workouts</span>
              <span className="badge bg-secondary rounded-pill">7</span>
            </button>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="input-group mb-4">
            <input type="text" className="form-control" placeholder="Search workouts..." aria-label="Search workouts" />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>

          <div className="row">
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <div key={workout._id} className="col-md-6 col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">{workout.name}</h5>
                      <button className="btn btn-sm btn-outline-light">
                        <i className="bi bi-star"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-light text-dark">
                          <i className="bi bi-clock me-1"></i> 45 min
                        </span>
                        <span className="badge bg-light text-dark">
                          <i className="bi bi-lightning-charge me-1"></i> Medium
                        </span>
                      </div>
                      <p className="card-text">{workout.description}</p>
                      <div className="mb-3">
                        <div className="progress">
                          <div className="progress-bar bg-success" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70% Completion Rate</div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-white d-flex justify-content-between">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-info-circle me-1"></i> Details
                      </button>
                      <button className="btn btn-sm btn-primary">
                        <i className="bi bi-play-fill me-1"></i> Start Workout
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  <i className="bi bi-info-circle me-2"></i>
                  No workouts found. Click "Create Workout" to get started!
                </div>
              </div>
            )}
          </div>

          <nav aria-label="Workout pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Workouts;