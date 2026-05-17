// ── APP INIT + RENDER ORCHESTRATION ──────────────────────────────────────

function init() {
  initState();
  ghToken = localStorage.getItem('gh_token') || '';

  if (!ghToken || !state.hunterName) {
    document.getElementById('setup-screen').style.display = 'flex';
    document.getElementById('app-main').style.display = 'none';
  } else {
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('app-main').style.display = 'block';
    loadFromGitHub().then(ok => {
      if (ok) renderAll();
      showToast(ok ? 'Data loaded from GitHub' : 'Using local data', ok ? 'ok' : 'err');
    });
  }
  renderAll();
}

function completeSetup() {
  const token = document.getElementById('setup-token').value.trim();
  const name  = document.getElementById('setup-name').value.trim();
  if (!token || !name) { alert('Please enter both token and name.'); return; }

  ghToken = token;
  state.hunterName = name;
  localStorage.setItem('gh_token', token);

  addLog(`${name} has awakened as a UPSC Hunter`, 0);
  saveLocal();

  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('app-main').style.display = 'block';

  loadFromGitHub().then(() => renderAll());
  renderAll();
}

// ── RENDER ALL ────────────────────────────────────────────────────────────
function renderAll() {
  renderHeader();
  renderQuests();
  renderConquestMap();
  renderDungeon();
  renderLog();
}

// ── HEADER ────────────────────────────────────────────────────────────────
function renderHeader() {
  const rank     = getCurrentRank();
  const nextRank = getNextRank();
  const xpInRank = state.totalXP - rank.xpNeeded;
  const xpNeeded = nextRank ? nextRank.xpNeeded - rank.xpNeeded : 1;
  const pct      = nextRank ? Math.min(100, Math.round(xpInRank / xpNeeded * 100)) : 100;
  const daysLeft = getExamDaysLeft();

  const el = document.getElementById('app-header');
  if (!el) return;

  el.innerHTML = `
    <div class="logo">UPSC <span>HUNTER</span></div>

    <div class="rank-badge" style="color:${rank.color};border-color:${rank.color}">${rank.rank}</div>
    <div>
      <div class="rank-name" style="color:${rank.color}">${rank.name}</div>
      <div class="rank-info">${rank.info} — ${state.hunterName || 'Hunter'}</div>
    </div>

    <div class="xp-wrap">
      <div class="xp-label">
        <span>XP</span>
        <span>${state.totalXP} / ${nextRank ? nextRank.xpNeeded : '∞'}</span>
      </div>
      <div class="xp-bar"><div class="xp-fill" style="width:${pct}%"></div></div>
    </div>

    <div class="hdr-chips">
      <div class="chip streak">🔥 <b>${state.streak || 0}</b> day streak</div>
      <div class="chip days">📅 <b>${state.totalDays || 0}</b> days studied</div>
      <div class="chip exam">⏳ <b>${daysLeft}</b> days to Prelims</div>
    </div>

    <div class="hdr-btns">
      <button class="btn btn-green" onclick="saveAll()">SAVE</button>
      <button class="btn" onclick="showResetConfirm()">RESET</button>
    </div>
  `;
}

// ── LOG ───────────────────────────────────────────────────────────────────
function renderLog() {
  const container = document.getElementById('log-list');
  if (!container) return;

  const log = (state.activityLog || []).slice(0, 40);
  if (log.length === 0) {
    container.innerHTML = '<div class="log-item"><span class="log-text" style="color:var(--muted)">No activity yet — start your first quest.</span></div>';
    return;
  }

  container.innerHTML = log.map((entry, i) => `
    <div class="log-item ${i === 0 ? 'highlight' : ''}">
      <span class="log-time">${entry.time}</span>
      <span class="log-text">${entry.text}</span>
      ${entry.xp ? `<span class="log-xp">+${entry.xp} XP</span>` : ''}
    </div>
  `).join('');
}

// ── SAVE / RESET ──────────────────────────────────────────────────────────
async function saveAll() {
  saveLocal();
  const ok = await saveToGitHub();
  showToast(ok ? '✓ Saved to GitHub' : '✓ Saved locally (GitHub failed)', ok ? 'ok' : 'err');
}

function showResetConfirm() {
  if (confirm('Reset ALL progress? This cannot be undone.')) {
    localStorage.removeItem('upsc_conquest_state');
    location.reload();
  }
}

// ── XP POPUP ─────────────────────────────────────────────────────────────
function showXPPop(amount) {
  const el = document.createElement('div');
  el.className = 'xp-pop';
  el.textContent = `+${amount} XP`;
  el.style.left = Math.random() * 60 + 20 + '%';
  el.style.top  = '120px';
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ── TOAST ─────────────────────────────────────────────────────────────────
let _toastTimer = null;
function showToast(msg, type = 'ok') {
  const el = document.getElementById('save-toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `save-toast show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3000);
}

// ── KEYBOARD SHORTCUT ─────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveAll();
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ── AUTO-SAVE every 5 min ─────────────────────────────────────────────────
setInterval(() => saveLocal(), 5 * 60 * 1000);

// ── BOOT ─────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', init);
