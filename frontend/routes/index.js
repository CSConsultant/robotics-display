const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Home page - Timer page
router.get('/', (req, res) => {
  res.render('index', { title: 'Competition Timer' });
});

// Add team page
router.get('/add-team', (req, res) => {
  res.render('add-team', { title: 'Add Team' });
});

// FLL teams list
router.get('/api/fll-teams', async (req, res) => {
  try {
    const teams = await db.allAsync('SELECT * FROM fll_teams ORDER BY id DESC');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Robofest teams list
router.get('/api/robofest-teams', async (req, res) => {
  try {
    const teams = await db.allAsync('SELECT * FROM robofest_teams ORDER BY id DESC');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add FLL team
router.post('/api/fll-teams', async (req, res) => {
  const { teamName, pitNumber } = req.body;
  try {
    await db.runAsync(
      'INSERT INTO fll_teams (teamName, pitNumber) VALUES (?, ?)',
      [teamName, pitNumber]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Robofest team
router.post('/api/robofest-teams', async (req, res) => {
  const { teamName, teamNumber } = req.body;
  try {
    await db.runAsync(
      'INSERT INTO robofest_teams (teamName, teamNumber) VALUES (?, ?)',
      [teamName, teamNumber]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update FLL team scores
router.put('/api/fll-teams/:id', async (req, res) => {
  const { round1Score, round2Score } = req.body;
  try {
    await db.runAsync(
      'UPDATE fll_teams SET round1Score = ?, round2Score = ? WHERE id = ?',
      [round1Score, round2Score, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Robofest team score
router.put('/api/robofest-teams/:id', async (req, res) => {
  const { score } = req.body;
  try {
    await db.runAsync(
      'UPDATE robofest_teams SET score = ? WHERE id = ?',
      [score, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete FLL team
router.delete('/api/fll-teams/:id', async (req, res) => {
  try {
    await db.runAsync('DELETE FROM fll_teams WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Robofest team
router.delete('/api/robofest-teams/:id', async (req, res) => {
  try {
    await db.runAsync('DELETE FROM robofest_teams WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
