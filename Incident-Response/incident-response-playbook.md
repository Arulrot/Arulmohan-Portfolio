# Incident Response Playbook

This playbook provides standardized steps to follow when any failure, outage, or error occurs in the Firebase Visitor Counter application.

## 🔥 Types of Incidents

- Database write denied
- Counter not loading
- API initialization error
- Website downtime

## 🧪 Troubleshooting

- Check Console for JavaScript errors
- Confirm Firebase rules allow read/write
- Ensure Firebase usage limits not exceeded
- Review recent changes to `index.html`

## 🧰 Tools

- Firebase Console
- GitHub Actions (for deployment checks)
- Browser DevTools
- Manual incident log in `incident-log.md`
