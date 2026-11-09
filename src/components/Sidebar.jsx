import React from 'react';
import Icon from './Icons.jsx';

const items = [
  { id: 'dashboard', label: 'Overview', icon: 'grid' },
  { id: 'explore', label: 'Explore internships', icon: 'search' },
  { id: 'saved', label: 'Saved internships', icon: 'bookmark' },
  { id: 'applications', label: 'Application tracker', icon: 'file' },
];

export default function Sidebar({ page, onNavigate, profile, onSignOut }) {
  const initials = profile.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'S';
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" onClick={(event) => { event.preventDefault(); onNavigate('dashboard'); }}>
        <span className="brand-mark">i</span><span>Intern<span className="brand-light-text">Track</span></span>
      </a>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {items.map((item) => (
          <button key={item.id} className={`side-link ${page === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)} aria-current={page === item.id ? 'page' : undefined}>
            <Icon name={item.icon}/><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer"/>
      <button className={`side-link profile-link ${page === 'profile' ? 'active' : ''}`} onClick={() => onNavigate('profile')} aria-current={page === 'profile' ? 'page' : undefined}>
        <Icon name="user"/><span>My profile</span>
      </button>
      <div className="sidebar-profile">
        <div className="avatar">{initials}</div>
        <div className="sidebar-user"><strong>{profile.name || 'Student'}</strong><span>Student account</span></div>
        <button className="icon-button signout-button" title="Sign out" aria-label="Sign out" onClick={onSignOut}><Icon name="logout"/></button>
      </div>
      <p className="sidebar-footnote">A clearer path to your next opportunity.</p>
    </aside>
  );
}
