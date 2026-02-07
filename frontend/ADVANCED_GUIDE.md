# Advanced Configuration & Deployment Guide

## 🔧 Advanced Customization

### Database Customization

**Add more fields to FLL teams:**
1. Edit `db/database.js` - modify the CREATE TABLE statement
2. Update the form in `views/add-team.ejs`
3. Update `routes/index.js` to handle new fields

Example: Adding a "Sponsor" field
```javascript
// In db/database.js - modify CREATE TABLE:
db.run(`CREATE TABLE IF NOT EXISTS fll_teams (
  ...existing fields...,
  sponsor TEXT,
  ...
)`)

// In views/add-team.ejs - add form field:
<input type="text" id="fllSponsor" name="sponsor">

// In routes/index.js - update POST:
const { teamName, pitNumber, sponsor } = req.body;
await db.runAsync(
  'INSERT INTO fll_teams (teamName, pitNumber, sponsor) VALUES (?, ?, ?)',
  [teamName, pitNumber, sponsor]
);
```

### Port Configuration

To run on a different port, edit `app.js`:
```javascript
const PORT = 3001;  // Change from 3000 to your desired port
```

### Database Location

The SQLite database is created at: `/Users/csconsultant/robotics-display/frontend/db/scoring.db`

To use a different location, edit `db/database.js`:
```javascript
const dbPath = '/path/to/your/database.db';
```

---

## 📊 Score Tracking (Future Enhancement)

The database includes score fields:
- FLL: `round1Score` and `round2Score`
- Robofest: `score`

To add score entry UI:

**Add to index.ejs timer display:**
```html
<button onclick="editTeamScore(teamId)" class="edit-score-btn">Edit Score</button>
```

**Add to timer.js:**
```javascript
async function updateTeamScore(teamId, score, round = null) {
  const endpoint = currentCompetition === 'fll' 
    ? `/api/fll-teams/${teamId}`
    : `/api/robofest-teams/${teamId}`;
  
  const body = currentCompetition === 'fll'
    ? { [round === 1 ? 'round1Score' : 'round2Score']: score }
    : { score: score };
  
  await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}
```

---

## 🌐 Deployment Options

### Option 1: Local Network Access

Run on your machine and access from other devices on the network:

1. Find your machine's IP address:
```bash
# macOS/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig
```

2. Access from other devices using: `http://YOUR_IP:3000`

### Option 2: Cloud Deployment

#### Heroku (Free tier available)
```bash
# Install Heroku CLI first
# Create Procfile in project root:
echo "web: npm start" > Procfile

# Deploy:
heroku login
heroku create your-app-name
git push heroku main
```

#### Railway.app (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Railway auto-deploys on push

#### Render
1. Push to GitHub
2. Create new Web Service on Render
3. Connect your repo

#### DigitalOcean / Linode (VPS)
```bash
# SSH into your server
ssh user@your_server_ip

# Clone repo and setup:
git clone your-repo
cd robotics-display/frontend
npm install
npm start
```

---

## 🔒 Security Considerations

### For Production Use:

**1. Add Input Validation**
```javascript
// In routes/index.js
function validateTeamName(name) {
  return typeof name === 'string' && name.trim().length > 0 && name.length <= 100;
}
```

**2. Add Rate Limiting**
```bash
npm install express-rate-limit
```

```javascript
// In app.js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

**3. Add CORS if needed**
```bash
npm install cors
```

```javascript
// In app.js
const cors = require('cors');
app.use(cors());
```

---

## 📈 Performance Tips

1. **Add Database Indexing:**
```javascript
db.run('CREATE INDEX idx_teamname ON fll_teams(teamName)');
```

2. **Implement Caching:**
```javascript
let teamsCache = null;
let cacheTime = 0;

async function getTeamsCached() {
  if (Date.now() - cacheTime < 60000) { // 1 minute cache
    return teamsCache;
  }
  teamsCache = await db.allAsync('SELECT * FROM fll_teams');
  cacheTime = Date.now();
  return teamsCache;
}
```

3. **Use Connection Pooling for larger databases**

---

## 🧪 Testing

### Manual Testing Checklist:

- [ ] Timer starts and counts down correctly
- [ ] Pause/Resume works
- [ ] Stop resets timer
- [ ] Time input validation works
- [ ] Adding FLL team saves correctly
- [ ] Adding Robofest team saves correctly
- [ ] Deleting teams removes them
- [ ] Tab switching shows correct teams
- [ ] Audio plays on timer complete
- [ ] Data persists after server restart
- [ ] Responsive design on mobile
- [ ] Keyboard controls work

### Automated Testing (Optional):

```bash
npm install --save-dev jest supertest
```

Create `test/api.test.js`:
```javascript
const request = require('supertest');
const app = require('../app');

describe('FLL Teams API', () => {
  test('POST /api/fll-teams should create team', async () => {
    const res = await request(app)
      .post('/api/fll-teams')
      .send({ teamName: 'Test Team', pitNumber: 1 });
    expect(res.statusCode).toBe(200);
  });
});
```

---

## 📱 Mobile Optimization

App is already responsive, but for better mobile experience:

**Add viewport meta tag (already included):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Add touch-friendly buttons:**
```css
@media (max-width: 480px) {
  .btn {
    min-height: 44px; /* Apple's recommended touch target size */
    min-width: 44px;
  }
}
```

---

## 🔄 Backup & Recovery

**Backup database:**
```bash
cp db/scoring.db db/scoring.db.backup
```

**Restore database:**
```bash
cp db/scoring.db.backup db/scoring.db
```

**Export teams to CSV:**
```javascript
const fs = require('fs');
const csv = require('csv-stringify/sync');

const teams = await db.allAsync('SELECT * FROM fll_teams');
const output = csv.stringify(teams, { header: true });
fs.writeFileSync('fll_teams_export.csv', output);
```

---

## 🚀 Performance Monitoring

**Add logging:**
```javascript
// In app.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

**Monitor database:**
```javascript
db.on('profile', (sql, time) => {
  console.log(`Query took ${time}ms: ${sql}`);
});
```

---

## 📚 Additional Features to Consider

- **Leaderboard page**: Sort and display teams by scores
- **Statistics dashboard**: Charts and analytics
- **Export functionality**: Save results as PDF or CSV
- **Multi-day tournaments**: Track results across multiple days
- **Judge notes**: Add notes for each team
- **Photo gallery**: Attach team photos
- **Real-time updates**: WebSockets for live score updates

---

## 🆘 Common Issues & Solutions

**Database locked error:**
```bash
# Delete the corrupted database and restart
rm db/scoring.db
npm start
```

**Port already in use:**
```bash
# On macOS/Linux: Find and kill process
lsof -i :3000
kill -9 <PID>

# Or change port in app.js to 3001, 3002, etc.
```

**Module not found:**
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support Resources

- Node.js Docs: https://nodejs.org/docs/
- Express Guide: https://expressjs.com/
- SQLite3 npm: https://www.npmjs.com/package/sqlite3
- MDN Web Docs: https://developer.mozilla.org/

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Environment variables set (if any)
- [ ] Database backed up
- [ ] All dependencies installed
- [ ] Error handling implemented
- [ ] Rate limiting added
- [ ] Input validation added
- [ ] HTTPS enabled (for production)
- [ ] Admin/password protection (if needed)
- [ ] Test on all target devices
- [ ] Documentation updated

---

**Happy deployment!** 🚀
