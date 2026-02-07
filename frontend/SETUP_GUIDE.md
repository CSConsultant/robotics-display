# Robotics Scoring App - Complete Setup Guide

## Overview
Your FIRST LEGO League and Robofest scoring application has been successfully created! This guide will help you get started.

## What's Included

### Backend (Express/Node.js)
- **app.js**: Main server file
- **routes/index.js**: API routes for team management
- **db/database.js**: SQLite database initialization and helpers

### Frontend
- **index.ejs**: Timer page (home page) with large timer display
- **add-team.ejs**: Form page for adding teams
- **styles.css**: Professional responsive styling
- **timer.js**: Timer functionality and team management
- **add-team.js**: Team form handling

### Database
- **SQLite Database**: Automatically created on first run
- **Tables**: `fll_teams`, `robofest_teams`, `timer_history`

## Features Implemented

✅ **Large Timer Display** - Easy to read from distance
✅ **Customizable Time** - Set any duration (minutes and seconds)
✅ **Timer Controls** - Start, Pause, Stop buttons
✅ **Team Management** - Add, view, and delete teams
✅ **Dual Competition Support** - FLL (2 rounds) and Robofest (1 round)
✅ **Persistent Storage** - SQLite database saves all data
✅ **Audio Alert** - Plays sound when timer completes
✅ **Responsive Design** - Works on all devices
✅ **Tab Navigation** - Easy switching between competitions
✅ **Robot Logo** - Featured on home page

## Getting Started

### Prerequisites
- Node.js v14 or higher
- npm (comes with Node.js)

### Installation

1. Dependencies are already installed. Verify with:
```bash
npm install
```

2. Add your media files:
   - Replace `public/robot.png` with your robot logo image (SVG placeholder included)
   - Replace `public/timer-sound.mp3` with your timer alert sound

### Starting the Server

**Option 1: Using VS Code Task**
1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Run Task"
3. Select "Start Robotics Scoring App"
4. Server will start and display in terminal

**Option 2: Manual Terminal**
```bash
npm start
```

**Option 3: Development Mode with Auto-Restart**
```bash
npm run dev
```

### Accessing the App
Once the server is running, open your browser and go to:
```
http://localhost:3000
```

## Usage Instructions

### Timer Page (Home)
1. **Set Time**: Enter minutes and seconds, click "Set Time"
2. **Start Timer**: Click "Start" button
3. **Pause/Resume**: Click "Pause" to pause, "Start" to resume
4. **Stop**: Click "Stop" to reset to original time
5. **Switch Competitions**: Use tabs to switch between FLL and Robofest
6. **Add Teams**: Click "+ Add Team" button to add new teams

### Add Team Page
1. **Choose Competition**: Use tabs to select FLL or Robofest
2. **Enter Information**:
   - **FLL**: Team Name and Pit Number
   - **Robofest**: Team Name and Team Number
3. **Submit**: Click "Add [Competition] Team"
4. **Return**: Click "← Back to Timer" to go back

## API Endpoints Reference

### Get Teams
```
GET /api/fll-teams
GET /api/robofest-teams
```

### Add Teams
```
POST /api/fll-teams
Body: { "teamName": "string", "pitNumber": number }

POST /api/robofest-teams
Body: { "teamName": "string", "teamNumber": number }
```

### Update Scores
```
PUT /api/fll-teams/:id
Body: { "round1Score": number, "round2Score": number }

PUT /api/robofest-teams/:id
Body: { "score": number }
```

### Delete Teams
```
DELETE /api/fll-teams/:id
DELETE /api/robofest-teams/:id
```

## Database Schema

### FLL Teams
```
id              INTEGER PRIMARY KEY
teamName        TEXT
pitNumber       INTEGER
round1Score     INTEGER (default 0)
round2Score     INTEGER (default 0)
createdAt       DATETIME
```

### Robofest Teams
```
id              INTEGER PRIMARY KEY
teamName        TEXT
teamNumber      INTEGER
score           INTEGER (default 0)
createdAt       DATETIME
```

## Customization Guide

### Changing Timer Sound
1. Find or create your timer alert sound (MP3 format recommended)
2. Replace the file at `public/timer-sound.mp3`
3. No code changes needed - it will play automatically

### Changing Robot Logo
1. Replace `public/robot.png` with your logo
2. Can be PNG, SVG, JPG, or GIF format
3. Recommended size: 80x80 pixels

### Styling Customization
Edit `public/styles.css` to modify:
- Colors (gradients are in the header section)
- Fonts and sizes
- Layout and spacing
- Button styles

### Timer Duration Limits
Edit `public/timer.js` around line 40 to change validation:
```javascript
if (minutes < 0 || minutes > 60 || seconds < 0 || seconds > 59)
```

## Troubleshooting

### Server won't start
- Check that port 3000 is not in use
- Try: `lsof -i :3000` to see what's using the port
- Change PORT in app.js if needed

### Timer sound not playing
- Ensure `timer-sound.mp3` exists in the `public/` folder
- Check browser console for errors (F12)
- Some browsers require user interaction before playing audio

### Database errors
- Delete `db/scoring.db` to reset database
- Database will be recreated on next server start
- All team data will be lost

### Styles not applying
- Clear browser cache (Cmd+Shift+R on macOS)
- Check that `public/styles.css` is being served

## Project Files Structure

```
frontend/
├── app.js                    # Express server
├── package.json             # Dependencies
├── README.md               # Project info
├── .gitignore              # Git ignore rules
│
├── db/
│   ├── database.js         # Database setup
│   └── scoring.db          # SQLite file (auto-created)
│
├── routes/
│   └── index.js            # API routes
│
├── views/
│   ├── index.ejs           # Timer page
│   └── add-team.ejs        # Add team page
│
├── public/
│   ├── styles.css          # Styling
│   ├── timer.js            # Timer logic
│   ├── add-team.js         # Form handling
│   ├── robot.png           # Logo (SVG placeholder)
│   └── timer-sound.mp3     # Alert sound
│
└── .vscode/
    └── tasks.json          # VS Code tasks
```

## Development Tips

1. **Hot Reload**: Use `npm run dev` to auto-restart on file changes
2. **Database**: Teams persist across sessions - data is saved in `db/scoring.db`
3. **Debugging**: Open browser DevTools (F12) to check console for errors
4. **Server Logs**: Check terminal for server output and errors

## Next Steps

1. ✅ Start the server
2. ✅ Add test teams
3. ✅ Test the timer
4. ✅ Add your robot logo and timer sound
5. ✅ Deploy to your local network or server

## Support

For issues or questions, check:
- Browser console (F12) for JavaScript errors
- Terminal output for server errors
- Database file exists at `db/scoring.db`

Enjoy running your competitions! 🤖🏆
