# InternTrack

**Your internship search, in sync.** InternTrack is a student-focused dashboard for keeping sample internship opportunities, saved roles, application progress, and deadlines together in one place.

> InternTrack is a frontend demonstration. Listings are illustrative sample data. Tracking an application only records it in this browser; it does not submit an application to an employer.

## Problem

Internship details, deadlines, and application updates are easy to lose when they are spread across job boards, notes, and email.

## Proposed solution

InternTrack puts the search workflow in a small personal workspace: browse and filter opportunities, save roles, track your application status, and keep student profile details nearby.

## Features

- Dashboard totals for sample listings, saved roles, tracked applications, and deadlines in the next seven days.
- Student registration, sign-in, and sign-out using browser LocalStorage.
- Search opportunities by role, company, location, or skill; filter by location, skill, and work type.
- Save and remove internship opportunities.
- Track applications and update statuses: Applied, Under Review, Interview, Selected, or Rejected.
- Edit a student name, education details, and skills.
- LocalStorage persistence across reloads for each browser account.
- Responsive sidebar and layouts for desktop, tablet, and mobile.

## Screenshots

The dashboard and opportunity explorer were checked in the browser after deployment. A screenshot file is not included in this repository yet.

## Technology

- React 19
- Vite 6
- JavaScript (ES modules)
- CSS
- Browser LocalStorage for demo account, profile, saved internship, and application data

## Project structure

```text
interntrack/
├── index.html
├── public/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── AuthScreen.jsx
│   │   ├── Icons.jsx
│   │   ├── InternshipCard.jsx
│   │   ├── Pages.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── internships.js
│   ├── lib/
│   │   └── storage.js
│   ├── main.jsx
│   └── styles.css
├── package.json
├── vercel.json
└── .gitignore
```

## Run locally

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Authentication and data limitations

No backend or external API is used. The demo stores account information and app data in the current browser's LocalStorage. Passwords are hashed in the browser before storage, but this does **not** provide production-grade authentication: users can inspect or change local data, and there is no server-side identity verification or account recovery. Do not use a real or reused password, and do not store sensitive personal information. Clearing browser storage removes the demo account and its data.

Internship company, role, stipend, and deadline details are sample content for demonstrating the interface. Verify listings independently before applying. The “Track application” action records a local tracking item only; InternTrack does not contact employers or submit application forms.

## Deployment

This Vite app is configured for Vercel with `vercel.json`:

- Framework: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none

Production URL: [interntrack-rosy-eight.vercel.app](https://interntrack-rosy-eight.vercel.app/). The current production build was deployed with the Vercel CLI. The Vercel GitHub integration could not yet be connected, so pushes do not trigger automatic deployments until that repository access is authorized in Vercel.

## Future improvements

- Connect verified opportunity feeds or an admin-managed listing service.
- Add deadline reminders, calendar export, and document links.
- Add server-backed authentication, password recovery, privacy controls, and account sync.
- Add secure employer application links and application notes.
- Add more search options, such as branch, duration, and stipend range.

## Author and links

- Author: [neeharikaannaluru25](https://github.com/neeharikaannaluru25)
- GitHub repository: [github.com/neeharikaannaluru25/InternTrack](https://github.com/neeharikaannaluru25/interntrack)
- Live deployment: https://interntrack-rosy-eight.vercel.app/
