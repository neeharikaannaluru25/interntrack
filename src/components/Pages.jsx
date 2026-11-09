import React, { useMemo, useState } from 'react';
import Icon from './Icons.jsx';
import InternshipCard from './InternshipCard.jsx';
import { applicationStatuses, daysUntil, formatDate } from '../data/internships.js';

function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>;
}

function StatCard({ icon, label, value, note, tone }) {
  return <article className="stat-card"><span className={`stat-icon ${tone}`}><Icon name={icon} size={19}/></span><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></article>;
}

function EmptyState({ icon, title, message, action, onAction }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={23}/></span><h3>{title}</h3><p>{message}</p>{action && <button className="button button-primary" onClick={onAction}>{action}<Icon name="arrow" size={16}/></button>}</div>;
}

function DeadlineList({ items, onExplore }) {
  if (!items.length) return <div className="deadline-empty"><Icon name="check" size={17}/><span>No deadlines in the next 7 days. You have some breathing room.</span></div>;
  return <div className="deadline-list">{items.map((item) => {
    const remaining = daysUntil(item.deadline);
    return <div className="deadline-item" key={item.id}><div className="deadline-company-mark">{item.logo}</div><div className="deadline-item-copy"><strong>{item.role}</strong><span>{item.company}</span></div><span className={`deadline-count ${remaining <= 5 ? 'urgent' : ''}`}>{remaining} days</span></div>;
  })}{onExplore && <button className="text-link" onClick={onExplore}>Browse all internships <Icon name="arrow" size={15}/></button>}</div>;
}

export function Dashboard({ profile, internships, savedIds, applications, onNavigate, onToggleSave, onApply }) {
  const recent = [...internships].sort((a, b) => a.postedDays - b.postedDays).slice(0, 3);
  const deadlines = [...internships].filter((item) => {
    const remaining = daysUntil(item.deadline);
    return remaining >= 0 && remaining <= 7;
  }).sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline));

  return <>
    <PageHeading eyebrow="MONDAY, YOUR MOMENT TO MOVE" title={`Good to see you, ${profile.name.split(' ')[0] || 'there'} 👋`} description="A little progress today can bring your next opportunity closer." action={<button className="button button-primary" onClick={() => onNavigate('explore')}>Explore internships <Icon name="arrow" size={16}/></button>}/>
    <section className="stats-grid" aria-label="Internship search overview">
      <StatCard icon="briefcase" label="Open opportunities" value={internships.length} note="Curated sample listings" tone="tone-violet"/>
      <StatCard icon="bookmark" label="Saved internships" value={savedIds.length} note="Worth a closer look" tone="tone-blue"/>
      <StatCard icon="file" label="Tracked applications" value={Object.keys(applications).length} note="Keep every next step visible" tone="tone-green"/>
      <StatCard icon="clock" label="Deadlines this week" value={deadlines.length} note="Across current opportunities" tone="tone-amber"/>
    </section>
    <section className="dashboard-grid">
      <div className="content-panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">FRESH OPPORTUNITIES</span><h2>Recently added</h2></div><button className="text-link" onClick={() => onNavigate('explore')}>View all <Icon name="arrow" size={15}/></button></div><div className="recent-list">{recent.map((internship) => <div className="recent-opportunity" key={internship.id}><div className={`company-mark small-mark ${internship.color}`}>{internship.logo}</div><div className="recent-copy"><strong>{internship.role}</strong><span>{internship.company} · {internship.location}</span></div><span className="posted-label">{internship.postedDays === 1 ? 'New today' : `${internship.postedDays}d ago`}</span><button className="icon-button recent-save" aria-label={savedIds.includes(internship.id) ? 'Unsave internship' : 'Save internship'} aria-pressed={savedIds.includes(internship.id)} onClick={() => onToggleSave(internship.id)}><Icon name="bookmark" size={17}/></button></div>)}</div></div>
      <div className="content-panel deadlines-panel"><div className="panel-heading"><div><span className="eyebrow">STAY AHEAD</span><h2>Coming up</h2></div><span className="panel-calendar"><Icon name="calendar" size={17}/></span></div><DeadlineList items={deadlines} onExplore={() => onNavigate('explore')}/></div>
    </section>
    <section className="dashboard-feature"><div className="feature-spark">✦</div><div><span className="eyebrow">A SMALL TIP</span><h2>Keep your momentum visible.</h2><p>Save roles that interest you and add an opportunity to your tracker when you apply. Your progress stays in this browser.</p></div><button className="button button-light" onClick={() => onNavigate('applications')}>Open my tracker <Icon name="arrow" size={16}/></button></section>
  </>;
}

export function Explorer({ internships, savedIds, applications, onToggleSave, onApply }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All locations');
  const [skill, setSkill] = useState('All skills');
  const [type, setType] = useState('All types');
  const locations = useMemo(() => [...new Set(internships.map((item) => item.location))].sort(), [internships]);
  const skills = useMemo(() => [...new Set(internships.flatMap((item) => item.skills))].sort(), [internships]);
  const filtered = internships.filter((item) => {
    const searchText = `${item.role} ${item.company} ${item.location} ${item.skills.join(' ')}`.toLowerCase();
    return searchText.includes(query.trim().toLowerCase())
      && (location === 'All locations' || item.location === location)
      && (skill === 'All skills' || item.skills.includes(skill))
      && (type === 'All types' || item.type === type);
  });
  const clearFilters = () => { setQuery(''); setLocation('All locations'); setSkill('All skills'); setType('All types'); };

  return <>
    <PageHeading eyebrow="FIND YOUR NEXT STEP" title="Explore internships" description="A focused collection of sample opportunities to help you get moving."/>
    <section className="filter-panel" aria-label="Filter internship opportunities">
      <label className="search-field"><Icon name="search"/><span className="visually-hidden">Search internships</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, companies or skills"/></label>
      <label className="filter-select"><span className="visually-hidden">Filter by location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="filter-select"><span className="visually-hidden">Filter by skill</span><select value={skill} onChange={(event) => setSkill(event.target.value)}><option>All skills</option>{skills.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="filter-select type-filter"><span className="visually-hidden">Filter by type</span><select value={type} onChange={(event) => setType(event.target.value)}><option>All types</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select></label>
    </section>
    <div className="results-heading"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'opportunity' : 'opportunities'} <span>· Sample listings</span></p>{(query || location !== 'All locations' || skill !== 'All skills' || type !== 'All types') && <button className="text-link" onClick={clearFilters}>Clear filters</button>}</div>
    {filtered.length ? <div className="internship-grid">{filtered.map((item) => <InternshipCard key={item.id} internship={item} saved={savedIds.includes(item.id)} applied={Boolean(applications[item.id])} onToggleSave={onToggleSave} onApply={onApply}/>)}</div> : <EmptyState icon="search" title="No internships match those filters" message="Try another search or clear a filter to see more opportunities." action="Clear filters" onAction={clearFilters}/>}
  </>;
}

export function SavedInternships({ internships, savedIds, applications, onNavigate, onToggleSave, onApply }) {
  const saved = internships.filter((item) => savedIds.includes(item.id));
  return <>
    <PageHeading eyebrow="YOUR SHORTLIST" title="Saved internships" description="Keep interesting roles close while you decide what to pursue."/>
    <div className="results-heading"><p><strong>{saved.length}</strong> saved {saved.length === 1 ? 'opportunity' : 'opportunities'}</p></div>
    {saved.length ? <div className="internship-grid">{saved.map((item) => <InternshipCard key={item.id} internship={item} saved applied={Boolean(applications[item.id])} onToggleSave={onToggleSave} onApply={onApply}/>)}</div> : <EmptyState icon="bookmark" title="Your shortlist is ready for a first save" message="Browse the sample listings and bookmark internships you want to revisit." action="Explore internships" onAction={() => onNavigate('explore')}/>}
  </>;
}

export function ApplicationTracker({ internships, applications, onStatusChange, onNavigate }) {
  const items = Object.entries(applications).map(([id, application]) => ({ ...internships.find((item) => item.id === id), ...application, id })).filter((item) => item.company);
  return <>
    <PageHeading eyebrow="YOUR PROGRESS, AT A GLANCE" title="Application tracker" description="Update your progress as each opportunity moves forward."/>
    <div className="tracker-summary"><span className="tracker-summary-icon"><Icon name="file"/></span><div><strong>{items.length} {items.length === 1 ? 'application' : 'applications'} tracked</strong><span>These are personal tracking notes. InternTrack does not submit applications to employers.</span></div></div>
    {items.length ? <div className="application-list">{items.map((item) => <article className="application-row" key={item.id}><div className={`company-mark ${item.color}`}>{item.logo}</div><div className="application-main"><h3>{item.role}</h3><p>{item.company} <span>·</span> {item.location}</p><div className="application-meta"><span><Icon name="calendar" size={14}/> Deadline {formatDate(item.deadline)}</span><span>Added {formatDate(item.appliedAt)}</span></div></div><label className="status-control"><span>Status</span><select value={item.status} onChange={(event) => onStatusChange(item.id, event.target.value)} className={`status-select status-${item.status.toLowerCase().replaceAll(' ', '-')}`}>{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select></label></article>)}</div> : <EmptyState icon="file" title="Your tracker is waiting for a first application" message="When you apply to a role, add it here to keep the next steps organized." action="Find internships" onAction={() => onNavigate('explore')}/>}
  </>;
}

export function Profile({ profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [education, setEducation] = useState(profile.education || '');
  const [skills, setSkills] = useState(profile.skills.join(', '));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (name.trim().length < 2) { setError('Please enter a name with at least 2 characters.'); setMessage(''); return; }
    onSave({ ...profile, name: name.trim(), education: education.trim(), skills: skills.split(',').map((item) => item.trim()).filter(Boolean) });
    setError('');
    setMessage('Your profile was saved on this device.');
  }

  return <>
    <PageHeading eyebrow="MAKE IT YOURS" title="Your profile" description="Add a little context so your internship search feels like yours."/>
    <div className="profile-layout"><section className="profile-intro"><div className="profile-avatar">{profile.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'S'}</div><h2>{profile.name}</h2><p>{profile.email}</p><span className="profile-badge">Student workspace</span><div className="profile-note"><Icon name="user" size={17}/><p>Your profile is stored locally in this browser and is not visible to employers.</p></div></section>
      <form className="content-panel profile-form" onSubmit={submit} noValidate><span className="eyebrow">PERSONAL DETAILS</span><h2>Profile information</h2><label className="field-label">Full name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required/></label><label className="field-label">Email address<input type="email" value={profile.email} readOnly/><span className="input-hint">Your sign-in email cannot be changed here.</span></label><label className="field-label">Education<input value={education} onChange={(event) => setEducation(event.target.value)} placeholder="e.g. B.Tech, Computer Science · 2027"/></label><label className="field-label">Skills <span className="input-hint inline-hint">Separate skills with commas</span><textarea value={skills} onChange={(event) => setSkills(event.target.value)} rows="3" placeholder="e.g. React, Python, Figma"/></label>{error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-success" role="status">{message}</p>}<button className="button button-primary" type="submit">Save profile <Icon name="check" size={16}/></button></form>
    </div>
  </>;
}
