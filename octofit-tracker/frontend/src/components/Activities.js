import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://upgraded-meme-pvw9v4wv6v93994w-8000.app.github.dev/api/activities/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching activities: ${error.message}`);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Helper function to format seconds as hours and minutes
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
  };

  // Activity type badge color mapping
  const getBadgeClass = (activityType) => {
    const types = {
      'Running': 'bg-success',
      'Cycling': 'bg-primary',
      'Swimming': 'bg-info',
      'Strength': 'bg-warning',
      'Crossfit': 'bg-danger'
    };
    return types[activityType] || 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading activities...</p>
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
    <div className="activities-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-activity me-2"></i>
          OctoFit Activities
        </h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Log Activity
        </button>
      </div>

      <div className="card">
        <div className="card-header bg-white">
          <div className="row align-items-center">
            <div className="col-md-6">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search activities" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="d-flex justify-content-md-end">
                <div className="dropdown me-2">
                  <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-filter me-1"></i> Filter
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                    <li><button className="dropdown-item" type="button">All Activities</button></li>
                    <li><button className="dropdown-item" type="button">Running</button></li>
                    <li><button className="dropdown-item" type="button">Cycling</button></li>
                    <li><button className="dropdown-item" type="button">Swimming</button></li>
                    <li><button className="dropdown-item" type="button">Strength</button></li>
                    <li><button className="dropdown-item" type="button">Crossfit</button></li>
                  </ul>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary active">
                    <i className="bi bi-list"></i>
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="bi bi-grid-3x3-gap"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Activity Type</th>
                  <th scope="col">User</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <tr key={activity._id}>
                      <td>
                        <span className={`badge ${getBadgeClass(activity.activity_type)} me-2`}>
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-primary text-white me-2">
                            {activity.user && typeof activity.user === 'object' ? activity.user.username.charAt(0).toUpperCase() : '?'}
                          </div>
                          {activity.user ? (typeof activity.user === 'object' ? activity.user.username : activity.user) : 'Unknown User'}
                        </div>
                      </td>
                      <td>
                        <i className="bi bi-clock me-1"></i>
                        {formatDuration(activity.duration)}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button type="button" className="btn btn-outline-primary">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button type="button" className="btn btn-outline-info">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button type="button" className="btn btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="alert alert-info mb-0">
                        No activities found. Click "Log Activity" to create one!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white">
          <nav aria-label="Activity pagination">
            <ul className="pagination justify-content-center mb-0">
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

export default Activities;