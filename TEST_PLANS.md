# 🧪 Gordon 360 UI – Test Plan

This document outlines a breakdown of test cases to cover features of Gordon360 UI


## ✅ General Guidelines

- Write unit and integration tests where appropriate.
- Ensure test cases cover:
  - **Expected behavior**
  - **Unusual/edge cases**
  - **Failure and recovery paths**
  - **Security implications (e.g., injection, privacy, access control)**


## First few ones
- [x] Enrollment check in
- [x] App redirect
- [x] Birthday Message
- [x] Emergency Info

## Home  Page

### Dining Balance (done)

- Test for **expected balance values** (e.g., positive numbers, decimals).
- Test for **zero balance** and **negative values**.
- Handle **unexpected inputs or backend failures** (e.g., malformed response).



### Quick Search (done)

- Valid input returns accurate results.
- Invalid or partial inputs return appropriate fallback.
- No results case.
- Debounce logic and rapid typing behavior.

### Days Left (Done)

## 🆔 ID Upload

- [ ] Test upload with correct image format.
- [ ] Test behavior for invalid file types.
- [ ] Does the app **redirect appropriately** after upload?
- [ ] File size limits.
- [ ] Security against harmful file uploads.


## 👤 Profile

Covering user-facing editable fields, data privacy, and UI logic:

### Social Media Links

- [ ] Are links properly sanitized?
- [ ] Can malicious links be submitted?
- [ ] Is link validation enforced (https, domain formats)?

### Profile Photo

- [ ] Upload, update, delete profile picture.
- [ ] File format and size restrictions.
- [ ] Image display across devices.

### Privacy Settings

- [ ] Toggle visibility of private fields.
- [ ] Do hidden fields stay hidden across sessions/devices?
- [ ] Backend respects privacy flags.

### Experience Transcript

- [ ] Correct display of involvements and roles.
- [ ] Edge case: no involvements.
- [ ] Data consistency with user record.

### Schedule

- [ ] Visibility toggling.
- [ ] Display format across devices.
- [ ] Handle malformed/overlapping time ranges.



## 🤝 Involvements

- [ ] Search functionality (by name, org, keyword).
- [ ] Internet failure behavior (graceful fallback or retry).
- [ ] Role-based visibility (student vs. admin).



## 📅 Events

- [ ] Network error recovery.
- [ ] Search and filter behavior.

---

## 🧑‍🤝‍🧑 People


## 🏋️‍♀️ Rec IM

A lot to be tested


