import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    // Example: Redirect to login page or clear user session
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <FontAwesomeIcon icon={faPlus} className="menu-icon" />
          <span>Add an event</span>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <FontAwesomeIcon icon={faList} className="menu-icon" />
          <span>Events list</span>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <FontAwesomeIcon icon={faUser} className="menu-icon" />
          <span>Users</span>
        </NavLink>
      </div>
      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <FontAwesomeIcon icon={faCog} className="menu-icon" />
          <span>Settings</span>
        </NavLink>
        <button className="sidebar-option logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;