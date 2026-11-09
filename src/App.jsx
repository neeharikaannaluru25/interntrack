import React, { useEffect, useState } from 'react';
import AuthScreen from './components/AuthScreen.jsx';
import Sidebar from './components/Sidebar.jsx';
import Icon from './components/Icons.jsx';
import { Dashboard, Explorer, SavedInternships, ApplicationTracker, Profile } from './components/Pages.jsx';
import { internships } from './data/internships.js';
import { createInitialUserData, readSession, readUserData, registerAccount, signIn, signOut, writeUserData } from './lib/storage.js';

function todayLabel() {
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
}

export default function App() {
  const [user, setUser] = useState(() => readSession());
  const [data, setData] = useState(() => {
    const currentUser = readSession();
    return currentUser ? readUserData(currentUser.email) || createInitialUserData(currentUser) : null;
  });
  const [page, setPage] = useState('dashboard');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (user && data) writeUserData(user.email, data);
  }, [user, data]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function authenticate(payload) {
    const account = payload.mode === 'register'
      ? await registerAccount(payload)
      : await signIn(payload);
    const saved = readUserData(account.email);
    setUser(account);
    setData(saved || createInitialUserData(account));
    setPage('dashboard');
  }

  function handleSignOut() {
    signOut();
    setUser(null);
    setData(null);
    setPage('dashboard');
  }

  function toggleSaved(id) {
    const wasSaved = data.savedIds.includes(id);
    setData((current) => ({
      ...current,
      savedIds: wasSaved ? current.savedIds.filter((item) => item !== id) : [...current.savedIds, id],
    }));
    setToast(wasSaved ? 'Removed from your saved internships.' : 'Saved to your shortlist.');
  }

  function trackApplication(id) {
    if (data.applications[id]) {
      setToast('This opportunity is already in your tracker.');
      return;
    }
    setData((current) => ({
      ...current,
      applications: { ...current.applications, [id]: { status: 'Applied', appliedAt: new Date().toISOString().slice(0, 10) } },
    }));
    setPage('applications');
    setToast('Added to your application tracker.');
  }

  function updateApplication(id, status) {
    setData((current) => ({
      ...current,
      applications: { ...current.applications, [id]: { ...current.applications[id], status } },
    }));
    setToast(`Status updated to ${status}.`);
  }

  function saveProfile(profile) {
    setData((current) => ({ ...current, profile }));
  }

  if (!user || !data) return <AuthScreen onAuthenticate={authenticate}/>;

  const pageTitles = {
    dashboard: 'Overview', explore: 'Explore internships', saved: 'Saved internships',
    applications: 'Application tracker', profile: 'Your profile',
  };

  return <div className="app-shell">
    <Sidebar page={page} onNavigate={setPage} profile={data.profile} onSignOut={handleSignOut}/>
    <main className="main-area">
      <header className="topbar"><div><span className="topbar-date">{todayLabel()}</span><span className="topbar-context">Your workspace <span> / </span>{pageTitles[page]}</span></div><div className="topbar-right"><span className="demo-indicator"><i/> Local demo</span><div className="topbar-avatar" aria-hidden="true">{data.profile.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'S'}</div></div></header>
      <div className="page-content">
        {page === 'dashboard' && <Dashboard profile={data.profile} internships={internships} savedIds={data.savedIds} applications={data.applications} onNavigate={setPage} onToggleSave={toggleSaved} onApply={trackApplication}/>}
        {page === 'explore' && <Explorer internships={internships} savedIds={data.savedIds} applications={data.applications} onToggleSave={toggleSaved} onApply={trackApplication}/>}
        {page === 'saved' && <SavedInternships internships={internships} savedIds={data.savedIds} applications={data.applications} onNavigate={setPage} onToggleSave={toggleSaved} onApply={trackApplication}/>}
        {page === 'applications' && <ApplicationTracker internships={internships} applications={data.applications} onStatusChange={updateApplication} onNavigate={setPage}/>}
        {page === 'profile' && <Profile profile={data.profile} onSave={saveProfile}/>}
        <footer className="app-footer"><span>InternTrack <span>·</span> Your internship search, in sync.</span><button type="button" onClick={() => setToast('Your profile and tracking data are stored only in this browser.')}>Privacy & demo details</button></footer>
      </div>
    </main>
    {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15}/></span>{toast}</div>}
  </div>;
}
