import React from 'react';
import Icon from './Icons.jsx';
import { formatDate, daysUntil } from '../data/internships.js';

export default function InternshipCard({ internship, saved, applied, onToggleSave, onApply, compact = false }) {
  const remaining = daysUntil(internship.deadline);
  return (
    <article className={`internship-card ${compact ? 'compact-card' : ''}`}>
      <div className="card-company-row">
        <div className={`company-mark ${internship.color}`}>{internship.logo}</div>
        <div className="company-meta"><strong>{internship.company}</strong><span>{internship.location}</span></div>
        <button className={`icon-button bookmark-button ${saved ? 'bookmarked' : ''}`} onClick={() => onToggleSave(internship.id)} aria-label={saved ? `Remove ${internship.role} from saved internships` : `Save ${internship.role}`} aria-pressed={saved} title={saved ? 'Remove saved internship' : 'Save internship'}><Icon name="bookmark"/></button>
      </div>
      <h3>{internship.role}</h3>
      {!compact && <p className="card-description">{internship.description}</p>}
      <div className="internship-tags">{internship.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
      <div className="card-detail-row"><span className="type-pill">{internship.type}</span><span className="stipend">{internship.stipend}</span></div>
      <div className={`deadline-row ${remaining <= 5 ? 'deadline-soon' : ''}`}><span><Icon name="calendar" size={15}/> Apply by {formatDate(internship.deadline)}</span><span>{remaining} days left</span></div>
      <button className={`button ${applied ? 'button-applied' : 'button-outline'} card-action`} onClick={() => onApply(internship.id)} disabled={applied}>
        {applied ? <><Icon name="check" size={16}/> Added to tracker</> : <>Track application <Icon name="arrow" size={16}/></>}
      </button>
    </article>
  );
}
