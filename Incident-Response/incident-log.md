# 📅 Incident Log

### 🧊 April 5, 2025
- **Issue**: Counter stuck at "Loading..."
- **Cause**: Firebase write denied due to rule
- **Action**: Updated rules to allow `.write: true`
- **Resolution Time**: 12 mins
- **Status**: Resolved
---

### 🔥 April 2, 2025
- **Issue**: Firebase app failed to initialize
- **Cause**: `firebaseConfig` was missing `measurementId`
- **Fix**: Added proper config key
