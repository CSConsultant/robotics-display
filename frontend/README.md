# Robotics Scoring App

A comprehensive scoring application for FIRST LEGO League (FLL) and Robofest competitions.

## Features

- **Competition Timer**: Large, easy-to-read timer display with customizable duration
- **Team Management**: Add, view, and delete teams for both competitions
- **Database Storage**: SQLite database to persist team information and scores
- **Dual Competition Support**: 
  - FIRST LEGO League: 2 rounds with team pit numbers
  - Robofest: 1 round with team numbers
- **Audio Alert**: Plays sound when timer completes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Start/Stop/Pause Controls**: Full timer control functionality

## Project Structure

```
frontend/
├── app.js                 # Express server main file
├── package.json          # Node.js dependencies
├── routes/
│   └── index.js          # API routes
├── db/
│   ├── database.js       # SQLite database setup
│   └── scoring.db        # SQLite database file (created on first run)
├── views/
│   ├── index.ejs         # Timer page (home page)
│   └── add-team.ejs      # Add team form page
└── public/
    ├── styles.css        # CSS styling
    ├── timer.js          # Timer page JavaScript
    ├── add-team.js       # Add team page JavaScript
    ├── robot.png         # Robot logo (place your image here)
    └── timer-sound.mp3   # Timer alert sound (place your MP3 here)
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Add your assets:
   - Place `robot.png` in the `public/` folder
   - Place `timer-sound.mp3` in the `public/` folder

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. **Set Timer**: Enter minutes and seconds, then click "Set Time"

4. **Add Teams**: Click "Add Team" to add new teams for either competition

5. **Start Competition**: Use the Start, Pause, and Stop buttons to control the timer

## API Endpoints

### FLL Teams
- `GET /api/fll-teams` - Get all FLL teams
- `POST /api/fll-teams` - Add new FLL team
- `PUT /api/fll-teams/:id` - Update FLL team scores
- `DELETE /api/fll-teams/:id` - Delete FLL team

### Robofest Teams
- `GET /api/robofest-teams` - Get all Robofest teams
- `POST /api/robofest-teams` - Add new Robofest team
- `PUT /api/robofest-teams/:id` - Update Robofest team score
- `DELETE /api/robofest-teams/:id` - Delete Robofest team

## Database Schema

### FLL Teams Table
```sql
CREATE TABLE fll_teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamName TEXT NOT NULL,
  pitNumber INTEGER NOT NULL,
  round1Score INTEGER DEFAULT 0,
  round2Score INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Robofest Teams Table
```sql
CREATE TABLE robofest_teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamName TEXT NOT NULL,
  teamNumber INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Requirements

- Node.js (v14 or higher)
- npm
- Modern web browser

## Dependencies

- **express**: Web framework
- **sqlite3**: Database driver
- **body-parser**: Request body parsing
- **ejs**: Template engine

## Development

For development with auto-restart:
```bash
npm run dev
```

This requires `nodemon` to be installed (included in devDependencies).

## Notes

- The timer sound will play when time runs out
- All team data is persisted in SQLite database
- The app supports switching between FLL and Robofest competitions via tabs
- Timer can be paused and resumed without losing time
