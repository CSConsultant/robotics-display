// Timer state
let timeRemaining = 300; // 5 minutes in seconds
let isRunning = false;
let isPaused = false;
let timerId = null;
let currentCompetition = 'fll'; // 'fll' or 'robofest'

// DOM Elements
const timerValue = document.getElementById('timerValue');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const setTimeBtn = document.getElementById('setTimeBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const tabButtons = document.querySelectorAll('.tab-button');
const teamsContainer = document.getElementById('teamsContainer');
const competitionTitle = document.getElementById('competitionTitle');
const timerAudio = document.getElementById('timerAudio');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
  loadTeams();
  setupEventListeners();
});

function setupEventListeners() {
  // Tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentCompetition = e.target.dataset.tab;
      loadTeams();
      updateCompetitionTitle();
    });
  });

  // Timer controls
  setTimeBtn.addEventListener('click', setTime);
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  stopBtn.addEventListener('click', stopTimer);

  // Allow setting time with Enter key
  minutesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setTime();
  });
  secondsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setTime();
  });
}

function updateCompetitionTitle() {
  if (currentCompetition === 'fll') {
    competitionTitle.textContent = 'FIRST LEGO League Teams';
  } else {
    competitionTitle.textContent = 'Robofest Teams';
  }
}

function setTime() {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  
  if (minutes < 0 || minutes > 60 || seconds < 0 || seconds > 59) {
    alert('Please enter valid time (0-60 minutes, 0-59 seconds)');
    return;
  }

  timeRemaining = minutes * 60 + seconds;
  updateTimerDisplay();
  
  // Reset button states
  isRunning = false;
  isPaused = false;
  updateButtonStates();
  
  // Clear any running timer
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  if (timeRemaining <= 0) {
    alert('Please set a valid time first');
    return;
  }

  if (isPaused) {
    // Resume from pause
    isPaused = false;
  } else if (isRunning) {
    return; // Already running
  }

  isRunning = true;
  updateButtonStates();

  timerId = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      timerComplete();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  isPaused = true;
  clearInterval(timerId);
  timerId = null;
  updateButtonStates();
}

function stopTimer() {
  isRunning = false;
  isPaused = false;
  clearInterval(timerId);
  timerId = null;
  
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  timeRemaining = minutes * 60 + seconds;
  
  updateTimerDisplay();
  updateButtonStates();
}

function updateTimerDisplay() {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  timerValue.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateButtonStates() {
  setTimeBtn.disabled = isRunning || isPaused;
  minutesInput.disabled = isRunning || isPaused;
  secondsInput.disabled = isRunning || isPaused;
  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;
  stopBtn.disabled = !isRunning && !isPaused;
}

function timerComplete() {
  isRunning = false;
  isPaused = false;
  clearInterval(timerId);
  timerId = null;
  
  updateButtonStates();
  
  // Play timer sound
  try {
    timerAudio.play();
  } catch (err) {
    console.log('Audio playback failed:', err);
  }
  
  // Alert user
  alert('Time\'s up!');
}

async function loadTeams() {
  try {
    const endpoint = currentCompetition === 'fll' ? '/api/fll-teams' : '/api/robofest-teams';
    const response = await fetch(endpoint);
    const teams = await response.json();
    
    teamsContainer.innerHTML = '';
    
    if (teams.length === 0) {
      teamsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 20px;">No teams added yet</p>';
      return;
    }

    teams.forEach(team => {
      const teamCard = createTeamCard(team);
      teamsContainer.appendChild(teamCard);
    });
  } catch (err) {
    console.error('Error loading teams:', err);
  }
}

function createTeamCard(team) {
  const card = document.createElement('div');
  card.className = 'team-card';
  
  if (currentCompetition === 'fll') {
    card.innerHTML = `
      <h3>${team.teamName}</h3>
      <div class="label">Pit Number</div>
      <p>${team.pitNumber}</p>
      <div class="label">Round 1 Score</div>
      <p>${team.round1Score || 0}</p>
      <div class="label">Round 2 Score</div>
      <p>${team.round2Score || 0}</p>
      <button class="delete-btn" onclick="deleteTeam('fll', ${team.id})">Delete</button>
    `;
  } else {
    card.innerHTML = `
      <h3>${team.teamName}</h3>
      <div class="label">Team Number</div>
      <p>${team.teamNumber}</p>
      <div class="label">Score</div>
      <p>${team.score || 0}</p>
      <button class="delete-btn" onclick="deleteTeam('robofest', ${team.id})">Delete</button>
    `;
  }
  
  return card;
}

async function deleteTeam(type, id) {
  if (!confirm('Are you sure you want to delete this team?')) return;
  
  try {
    const endpoint = type === 'fll' ? `/api/fll-teams/${id}` : `/api/robofest-teams/${id}`;
    const response = await fetch(endpoint, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadTeams();
    }
  } catch (err) {
    console.error('Error deleting team:', err);
    alert('Failed to delete team');
  }
}

// Initialize button states on page load
updateButtonStates();
