import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <img src="/octofitapp-small.png" width="40" height="40" className="d-inline-block align-top me-2" alt="OctoFit Logo" />
                OctoFit Tracker
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/users">
                      <i className="bi bi-people me-1"></i> Users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/teams">
                      <i className="bi bi-people-fill me-1"></i> Teams
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/activities">
                      <i className="bi bi-activity me-1"></i> Activities
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/leaderboard">
                      <i className="bi bi-trophy me-1"></i> Leaderboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/workouts">
                      <i className="bi bi-lightning-charge me-1"></i> Workouts
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="container py-4">
          <Routes>
            <Route path="/" element={
              <div className="text-center my-5">
                <img src="/octofitapp-small.png" width="150" height="150" className="mb-4" alt="OctoFit Logo" />
                <h1 className="display-4 fw-bold" style={{ color: 'var(--octofit-primary)' }}>Welcome to OctoFit Tracker</h1>
                <p className="lead">Mergington High School's Premier Fitness Tracking Application</p>
                <div className="mt-5">
                  <Link to="/activities" className="btn btn-primary me-3">
                    <i className="bi bi-play-fill me-1"></i> Get Started
                  </Link>
                  <Link to="/leaderboard" className="btn btn-outline-primary">
                    <i className="bi bi-trophy me-1"></i> View Leaderboard
                  </Link>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        <footer className="text-center py-4">
          <div className="container">
            <p className="mb-0">© 2025 OctoFit Tracker - Mergington High School</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
