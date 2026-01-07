// profile.js
// Student Dashboard - Authentication, Dynamic Content, Theme Toggle

/**
 * ===== AUTHENTICATION & DATA =====
 */

// Get the currently signed-in account from localStorage
function getCurrentAccount() {
  const email = localStorage.getItem('acm_current');
  if (!email) return null;
  try {
    const accounts = JSON.parse(localStorage.getItem('acm_accounts') || '[]');
    return accounts.find(a => (a.email || '').toLowerCase() === email.toLowerCase()) || null;
  } catch (e) {
    return null;
  }
}

// Verify authentication on page load
function verifyAuth() {
  const acct = getCurrentAccount();
  if (!acct) {
    location.href = 'signin-signup.html';
    return null;
  }
  return acct;
}

// Get mock events (in a real app, fetch from server)
function getMockEvents() {
  return [
    {
      id: 1,
      title: 'AI/ML Workshop',
      date: '2025-12-15',
      time: '14:00',
      location: 'Tech Lab 101',
      category: 'workshop',
      description: 'Learn fundamentals of machine learning',
      attendees: 45
    },
    {
      id: 2,
      title: 'Winter Hackathon',
      date: '2025-12-20',
      time: '09:00',
      location: 'Main Campus',
      category: 'hackathon',
      description: '48-hour coding competition',
      attendees: 120
    },
    {
      id: 3,
      title: 'Industry Panel Discussion',
      date: '2026-01-10',
      time: '16:00',
      location: 'Auditorium A',
      category: 'seminar',
      description: 'Meet professionals from top tech companies',
      attendees: 200
    },
    {
      id: 4,
      title: 'Web Dev Bootcamp',
      date: '2026-01-15',
      time: '15:00',
      location: 'Online',
      category: 'workshop',
      description: 'Master modern web development',
      attendees: 60
    },
    {
      id: 5,
      title: 'Monthly Meetup',
      date: '2026-01-12',
      time: '18:00',
      location: 'Student Center',
      category: 'meetup',
      description: 'Casual networking and social gathering',
      attendees: 30
    }
  ];
}

/**
 * ===== DOM POPULATION =====
 */

// Populate profile header with user data
function populateProfile(account) {
  const firstName = (account.displayName || account.email || '').split(' ')[0];
  const initials = getInitials(account.displayName || account.email);

  document.getElementById('avatar-initials').textContent = initials;
  document.getElementById('user-name').textContent = `Welcome, ${firstName}!`;
  document.getElementById('user-email').textContent = account.email || '';
  document.getElementById('user-role').textContent = account.role || account.year || 'Member';
  document.getElementById('first-name').textContent = firstName;

  // Welcome message
  const hour = new Date().getHours();
  let greeting = 'Welcome back';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  document.getElementById('welcome-message').textContent = `${greeting}! Explore upcoming events, connect with peers, and grow your skills with ACM.`;

  // Stats
  const joinedDate = new Date(account.joinedAt || new Date());
  const daysSinceMember = Math.floor((new Date() - joinedDate) / (1000 * 60 * 60 * 24)) + 1;
  document.getElementById('events-count').textContent = '0'; // Will be calculated
  document.getElementById('streak-count').textContent = Math.min(daysSinceMember, 7);
  document.getElementById('points-count').textContent = daysSinceMember * 10;
  document.getElementById('stats-member-since').textContent = daysSinceMember + ' days';
}

// Get initials from name
function getInitials(name) {
  if (!name) return 'AC';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

// Populate events sections
function populateEvents() {
  const allEvents = getMockEvents();

  // Simulate registered events (first 2)
  const registeredEvents = allEvents.slice(0, 2);
  const upcomingEvents = allEvents.slice(1, 4);
  const ongoingEvents = []; // No ongoing for demo

  // Update counts
  document.getElementById('registered-count').textContent = registeredEvents.length;
  document.getElementById('upcoming-count').textContent = upcomingEvents.length;
  document.getElementById('ongoing-count').textContent = ongoingEvents.length;
  document.getElementById('stats-total').textContent = allEvents.length;
  document.getElementById('stats-attendance').textContent = Math.round((registeredEvents.length / allEvents.length) * 100) + '%';
  document.getElementById('stats-achievements').textContent = Math.floor(registeredEvents.length / 2);

  // Render registered events
  const registeredContainer = document.getElementById('registered-events');
  if (registeredEvents.length > 0) {
    registeredContainer.innerHTML = registeredEvents.map(event => renderEventItem(event)).join('');
  }

  // Render upcoming events
  const upcomingContainer = document.getElementById('upcoming-events');
  if (upcomingEvents.length > 0) {
    upcomingContainer.innerHTML = upcomingEvents.map(event => renderEventItem(event)).join('');
  }

  // Render ongoing events
  const ongoingContainer = document.getElementById('ongoing-events');
  if (ongoingEvents.length > 0) {
    ongoingContainer.innerHTML = ongoingEvents.map(event => renderEventItem(event)).join('');
  } else {
    ongoingContainer.innerHTML = '<div class="empty-state"><p>No ongoing events at the moment.</p></div>';
  }

  // Populate timeline
  populateTimeline(allEvents);
}

// Render single event item
function renderEventItem(event) {
  return `
    <div class="event-item">
      <div class="event-header">
        <div>
          <p class="event-title">${event.title}</p>
          <p class="event-date">${formatDate(event.date)} at ${event.time}</p>
        </div>
      </div>
      <p class="event-desc">${event.description}</p>
      <div class="event-meta">
        <span>📍 ${event.location}</span>
        <span>👥 ${event.attendees} attending</span>
        <span class="category-badge">${event.category}</span>
      </div>
    </div>
  `;
}

// Format date to readable format
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Populate timeline with activity
function populateTimeline(events) {
  const container = document.getElementById('timeline-container');
  let html = '';

  // Account creation
  const acct = getCurrentAccount();
  const joinedDate = new Date(acct.joinedAt || new Date());
  html += `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="timeline-date">${formatDate(joinedDate.toISOString().split('T')[0])}</p>
        <p class="timeline-title">Joined ACM Chapter</p>
        <p class="timeline-desc">Welcome to our student community!</p>
      </div>
    </div>
  `;

  // Recent events
  const recentEvents = events.slice(0, 3);
  recentEvents.forEach((event, idx) => {
    const daysFromNow = Math.floor((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24));
    let status = '';
    if (daysFromNow < 0) status = 'Completed';
    else if (daysFromNow === 0) status = 'Today';
    else if (daysFromNow === 1) status = 'Tomorrow';
    else status = `In ${daysFromNow} days`;

    html += `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="timeline-date">${status}</p>
          <p class="timeline-title">${event.title}</p>
          <p class="timeline-desc">${event.location}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * ===== THEME TOGGLE =====
 */

// Initialize theme from localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

/**
 * ===== LOGOUT & EVENT HANDLERS =====
 */

// Handle logout
function handleLogout() {
  localStorage.removeItem('acm_current');
  location.href = 'signin-signup.html';
}

// Handle quick action buttons
function setupQuickActions() {
  const browseEventsBtn = document.getElementById('browseEventsBtn');
  const editProfileBtn = document.getElementById('editProfileBtn');

  if (browseEventsBtn) {
    browseEventsBtn.addEventListener('click', () => {
      document.getElementById('upcoming-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      alert('Profile editing feature coming soon!');
    });
  }
}

/**
 * ===== INITIALIZATION =====
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Verify authentication
  const account = verifyAuth();
  if (!account) return;

  // 2. Initialize theme
  initializeTheme();

  // 3. Populate profile
  populateProfile(account);

  // 4. Populate events
  populateEvents();

  // 5. Setup event handlers
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  setupQuickActions();

  // 6. Smooth scroll for navigation cards
  document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  console.log('Dashboard loaded successfully');
});
