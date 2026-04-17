const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const visitorCount = document.getElementById('visitor-count');

// ── Theme Toggle ──────────────────────────────────────────────────────────────
let currentTheme = 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  currentTheme = theme;
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ── Visitor Counter ───────────────────────────────────────────────────────────
async function trackVisit() {
  try {
    const res = await fetch('/visit');
    const data = await res.json();
    visitorCount.textContent = data.count.toLocaleString();
  } catch (e) {
    visitorCount.textContent = '—';
  }
}

trackVisit();

// ── Send message on button click ──────────────────────────────────────────────
sendBtn.addEventListener('click', sendMessage);

// ── Send message on Enter key ─────────────────────────────────────────────────
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// ── Quick-chip buttons ────────────────────────────────────────────────────────
function sendChip(text) {
  userInput.value = text;
  sendMessage();
}

// ── Core send function ────────────────────────────────────────────────────────
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';

  const typingEl = showTyping();

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    typingEl.remove();
    appendMessage(data.reply, 'bot');

  } catch (error) {
    typingEl.remove();
    appendMessage('⚠️ Connection error. Make sure the server is running!', 'bot');
  }
}

// ── Append a chat bubble ──────────────────────────────────────────────────────
function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function showTyping() {
  const div = document.createElement('div');
  div.classList.add('typing');
  div.innerHTML = '<span></span><span></span><span></span>';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}
