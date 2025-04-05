# 🔄 Rollback Plan

## Scenario: Firebase Counter Write Blocked

### 🧪 Verify Issue
- Open Firebase Console > Realtime Database > Rules
- Check if write permission is `"auth != null"`

### 🧯 Immediate Fix
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
