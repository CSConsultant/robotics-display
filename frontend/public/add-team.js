// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const fllForm = document.getElementById('fllForm');
const robofestForm = document.getElementById('robofestForm');
const successMessage = document.getElementById('successMessage');
let currentTab = 'fll';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentTab = e.target.dataset.tab;
      switchForm();
    });
  });

  // Form submissions
  fllForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addFLLTeam();
  });

  robofestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRobofestTeam();
  });
}

function switchForm() {
  const fllFormSection = document.getElementById('fll-form');
  const robofestFormSection = document.getElementById('robofest-form');

  if (currentTab === 'fll') {
    fllFormSection.classList.add('active');
    robofestFormSection.classList.remove('active');
  } else {
    fllFormSection.classList.remove('active');
    robofestFormSection.classList.add('active');
  }

  // Clear success message when switching tabs
  successMessage.classList.remove('show');
  successMessage.textContent = '';
}

async function addFLLTeam() {
  const teamName = document.getElementById('fllTeamName').value.trim();
  const pitNumber = parseInt(document.getElementById('fllPitNumber').value);

  if (!teamName || !pitNumber) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('/api/fll-teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ teamName, pitNumber })
    });

    if (response.ok) {
      showSuccess(`${teamName} added successfully!`);
      fllForm.reset();
    } else {
      alert('Failed to add team');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error adding team');
  }
}

async function addRobofestTeam() {
  const teamName = document.getElementById('robofestTeamName').value.trim();
  const teamNumber = parseInt(document.getElementById('robofestTeamNumber').value);

  if (!teamName || !teamNumber) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('/api/robofest-teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ teamName, teamNumber })
    });

    if (response.ok) {
      showSuccess(`${teamName} added successfully!`);
      robofestForm.reset();
    } else {
      alert('Failed to add team');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error adding team');
  }
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 3000);
}
