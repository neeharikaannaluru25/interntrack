import React, { useState } from 'react';

export default function AuthScreen({ onAuthenticate }) {
  const [mode, setMode] = useState('login');
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const registering = mode === 'register';

  function update(event) {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (registering && fields.name.trim().length < 2) {
      setError('Enter your name so we can personalize your workspace.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    if (fields.password.length < 8) {
      setError('Use a password with at least 8 characters.');
      return;
    }
    if (registering && fields.password !== fields.confirmPassword) {
      setError('Those passwords do not match.');
      return;
    }

    setBusy(true);
    try {
      await onAuthenticate(registering ? {
        mode, name: fields.name, email: fields.email, password: fields.password,
      } : { mode, email: fields.email, password: fields.password });
    } catch (authError) {
      setError(authError.message || 'We could not sign you in. Please try again.');
      setBusy(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError('');
  }

  return (
    <main className="auth-shell">
      <section className="auth-story" aria-label="About InternTrack">
        <a className="brand brand-light" href="#login" aria-label="InternTrack home">
          <span className="brand-mark">i</span> InternTrack
        </a>
        <div className="story-copy">
          <span className="eyebrow light-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>Make your internship search feel <em>in control.</em></h1>
          <p>Keep every opportunity, deadline and application update together, so you can focus on finding work that moves you forward.</p>
          <div className="story-note"><span className="story-note-icon">✦</span><span>One calm place for all the steps between “interested” and “offer.”</span></div>
        </div>
        <div className="story-footer"><span>Thoughtful tools for your next step</span><span>01 / 03</span></div>
        <div className="story-orbit orbit-one"/><div className="story-orbit orbit-two"/>
      </section>
      <section className="auth-panel" id="login">
        <div className="auth-topline"><span>STUDENT WORKSPACE</span><span className="secure-note"><i/> Your data stays on this device</span></div>
        <div className="auth-card">
          <div className="auth-mobile-brand"><span className="brand-mark">i</span> InternTrack</div>
          <span className="eyebrow">WELCOME {registering ? 'ABOARD' : 'BACK'}</span>
          <h2>{registering ? 'Create your account' : 'Sign in to your space'}</h2>
          <p className="auth-subtitle">{registering ? 'A more organized internship search starts with a few details.' : 'Pick up where your internship search left off.'}</p>
          <div className="auth-tabs" role="tablist" aria-label="Account access">
            <button type="button" role="tab" aria-selected={!registering} className={!registering ? 'selected' : ''} onClick={() => switchMode('login')}>Sign in</button>
            <button type="button" role="tab" aria-selected={registering} className={registering ? 'selected' : ''} onClick={() => switchMode('register')}>Create account</button>
          </div>
          <form onSubmit={submit} noValidate>
            {registering && <label className="field-label">Full name<input name="name" value={fields.name} onChange={update} placeholder="e.g. Aanya Sharma" autoComplete="name" required /></label>}
            <label className="field-label">Email address<input name="email" type="email" value={fields.email} onChange={update} placeholder="you@university.edu" autoComplete="email" required /></label>
            <label className="field-label">Password<input name="password" type="password" value={fields.password} onChange={update} placeholder="At least 8 characters" autoComplete={registering ? 'new-password' : 'current-password'} required minLength={8} /></label>
            {registering && <label className="field-label">Confirm password<input name="confirmPassword" type="password" value={fields.confirmPassword} onChange={update} placeholder="Enter your password again" autoComplete="new-password" required /></label>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" disabled={busy} type="submit">{busy ? 'Please wait…' : registering ? 'Create my workspace' : 'Sign in'} <span aria-hidden="true">→</span></button>
          </form>
          <p className="auth-privacy">Demo authentication only. Your account and data are stored in this browser; this is not production-grade account security.</p>
        </div>
        <div className="auth-bottom"><span>InternTrack · Internship search, in sync</span><span>Made for your next move</span></div>
      </section>
    </main>
  );
}
