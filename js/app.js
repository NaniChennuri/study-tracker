// ── CONFIG ────────────────────────────────────────────────────────────────
const GITHUB_USER = 'NaniChennuri';
const GITHUB_REPO = 'study-tracker';
const DATA_FILE   = 'tracker-data.json';
const START_DATE  = '2026-08-01';

// ── STATE ─────────────────────────────────────────────────────────────────
// topics:  { 'subjectId:groupId:i': { rr: bool, ans: int, mcq: int } }
// ca:      { 'YYYY-MM-DD': true }
// csat:    ['YYYY-MM-DD', ...]
// essays:  number

const DEFAULT_STATE = {
  name: '',
  topics: {},
  ca: {},
  csat: [],
  essays: 0,
  essayDates: [],
};

let state      = { ...DEFAULT_STATE };
let ghToken    = '';
let ghFileSHA  = '';
let activeSubjectId = null;
let isDirty    = false;

function markDirty() {
  isDirty = true;
  const btn = document.getElementById('btn-save');
  if (btn) btn.classList.add('dirty');
}

function markClean() {
  isDirty = false;
  const btn = document.getElementById('btn-save');
  if (btn) btn.classList.remove('dirty');
}

// ── HELPERS ───────────────────────────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function tKey(subjectId, groupId, i) {
  return `${subjectId}:${groupId}:${i}`;
}

function getTopic(subjectId, groupId, i) {
  return state.topics[tKey(subjectId, groupId, i)] || { rr: false, ans: 0, mcq: 0 };
}

function daysToExam() {
  const exam = new Date(EXAM_DATE);
  const today = new Date(); today.setHours(0,0,0,0); exam.setHours(0,0,0,0);
  return Math.max(0, Math.round((exam - today) / 86400000));
}

function dateRange(from, to) {
  const dates = [];
  const cur = new Date(from);
  const end = new Date(to);
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}

// ── PERSISTENCE — LOCAL ───────────────────────────────────────────────────
function saveLocal() {
  localStorage.setItem('upsc_tracker_v2', JSON.stringify(state));
  markDirty();
}

function loadLocal() {
  try {
    const raw = localStorage.getItem('upsc_tracker_v2');
    if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch(e) {}
}

// ── PERSISTENCE — GITHUB ──────────────────────────────────────────────────
async function saveToGitHub() {
  if (!ghToken) return false;
  try {
    // Always fetch latest SHA before writing to avoid 409 conflicts
    if (!ghFileSHA) {
      const check = await fetch(
        `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
        { headers: { Authorization: `token ${ghToken}`, Accept: 'application/vnd.github.v3+json' } }
      );
      if (check.ok) { const j = await check.json(); ghFileSHA = j.sha; }
    }
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(state, null, 2))));
    const body = { message: `update: ${todayStr()}`, content };
    if (ghFileSHA) body.sha = ghFileSHA;
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${ghToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      const json = await res.json();
      ghFileSHA = json.content.sha;
      return true;
    }
    // If 409 conflict, fetch fresh SHA and retry once
    if (res.status === 409 || res.status === 422) {
      const check = await fetch(
        `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
        { headers: { Authorization: `token ${ghToken}`, Accept: 'application/vnd.github.v3+json' } }
      );
      if (check.ok) {
        const j = await check.json(); ghFileSHA = j.sha;
        body.sha = ghFileSHA;
        const retry = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
          { method: 'PUT', headers: { Authorization: `token ${ghToken}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
        );
        if (retry.ok) { const rj = await retry.json(); ghFileSHA = rj.content.sha; return true; }
      }
    }
    return false;
  } catch(e) { return false; }
}

async function loadFromGitHub() {
  if (!ghToken) return false;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
      { headers: { Authorization: `token ${ghToken}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (res.ok) {
      const json = await res.json();
      ghFileSHA = json.sha;
      const data = JSON.parse(decodeURIComponent(escape(atob(json.content))));
      state = { ...DEFAULT_STATE, ...data };
      saveLocal();
      return true;
    }
    return false;
  } catch(e) { return false; }
}

async function saveAll() {
  saveLocal();
  const ok = await saveToGitHub();
  if (ok) markClean();
  showToast(ok ? '✓ Saved to GitHub' : '✓ Saved locally (GitHub failed)', ok);
}

function showSetupError(msg) {
  const el = document.getElementById('setup-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

// ── SETUP ─────────────────────────────────────────────────────────────────
function completeSetup() {
  const name  = document.getElementById('setup-name').value.trim();
  const token = document.getElementById('setup-token').value.trim();
  if (!name || !token) { showSetupError('Please enter both name and token.'); return; }
  state.name = name;
  ghToken = token;
  localStorage.setItem('gh_token', token);
  saveLocal();
  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  loadFromGitHub().then(() => renderAll());
  renderAll();
}

// ── STATS ─────────────────────────────────────────────────────────────────
function subjectStats(subject) {
  if (!subject.groups) return null;
  let total = 0, done = 0;
  subject.groups.forEach(g => g.topics.forEach((_, i) => {
    total++;
    if (getTopic(subject.id, g.id, i).rr) done++;
  }));
  return { total, done };
}

function overallStats() {
  let total = 0, done = 0, ans = 0, mcq = 0;
  SECTIONS.forEach(sec => sec.subjects.forEach(subj => {
    if (!subj.groups) return;
    subj.groups.forEach(g => g.topics.forEach((_, i) => {
      const t = getTopic(subj.id, g.id, i);
      total++; if (t.rr) done++;
      ans += (t.ans || 0); mcq += (t.mcq || 0);
    }));
  }));
  return { total, done, ans, mcq };
}

// ── TOPBAR ────────────────────────────────────────────────────────────────
function renderTopbar() {
  const today  = todayStr();
  const caDone = !!state.ca[today];
  const btn    = document.getElementById('ca-today-btn');
  const daysEl = document.getElementById('tb-days');
  const actEl  = document.getElementById('tb-active');
  if (btn) {
    btn.textContent = caDone ? '✓' : '○';
    btn.className   = 'ca-btn' + (caDone ? ' done' : '');
  }
  if (daysEl) daysEl.textContent = `${daysToExam()} days to exam`;
  if (actEl) {
    const start = START_DATE <= today ? START_DATE : today;
    const totalDays = dateRange(start, today).length;
    const activeDays = dateRange(start, today).filter(d => !!state.ca[d]).length;
    actEl.textContent = `${activeDays}/${totalDays} days active`;
  }
}

function toggleCAToday() {
  const today = todayStr();
  if (state.ca[today]) delete state.ca[today];
  else state.ca[today] = true;
  saveLocal();
  renderTopbar();
  // if CA panel is open, refresh it
  if (activeSubjectId === 'ca') renderMain();
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────
function renderSidebar() {
  document.getElementById('sidebar').innerHTML = SECTIONS.map(sec => `
    <div class="sec-block">
      <div class="sec-label">${sec.label}</div>
      ${sec.subjects.map(subj => {
        const st = subjectStats(subj);
        const active = activeSubjectId === subj.id ? ' active' : '';
        let right = '';
        if (st) {
          const pct = st.total ? Math.round(st.done / st.total * 100) : 0;
          right = `<span class="subj-pct ${pct === 100 ? 'complete' : ''}">${st.done}/${st.total} · ${pct}%</span>`;
        }
        return `<div class="subj-item${active}" onclick="navigate('${subj.id}')">
          <span class="subj-name">${subj.label}</span>${right}
        </div>`;
      }).join('')}
    </div>
  `).join('');
}

// ── ROUTING ───────────────────────────────────────────────────────────────
function navigate(subjectId) {
  activeSubjectId = subjectId;
  renderSidebar();
  renderMain();
}

function navigateHome() {
  activeSubjectId = null;
  renderSidebar();
  renderMain();
}

// ── MAIN ──────────────────────────────────────────────────────────────────
function renderMain() {
  const el = document.getElementById('main');
  if (!activeSubjectId) { renderHome(el); return; }

  // special panels
  if (activeSubjectId === 'ca')     { renderCAPanel(el);     return; }
  if (activeSubjectId === 'essays') { renderEssaysPanel(el); return; }
  if (activeSubjectId === 'csat')   { renderCSATPanel(el);   return; }

  let subject = null;
  for (const sec of SECTIONS) {
    subject = sec.subjects.find(s => s.id === activeSubjectId);
    if (subject) break;
  }
  if (!subject || !subject.groups) return;

  const st  = subjectStats(subject);

  el.innerHTML = `
    <div class="main-header">
      <h1 class="main-title">${subject.label}</h1>
    </div>
    <div class="topic-table">
      <div class="table-head">
        <div class="col-topic">Topic</div>
        <div class="col-rr">Read &amp; Revise</div>
        <div class="col-ans">Answers</div>
        <div class="col-mcq">MCQs</div>
      </div>
      ${subject.groups.map(g => `
        <div class="group-header">${g.label}</div>
        ${g.topics.map((topic, i) => buildRow(subject.id, g.id, i, topic)).join('')}
      `).join('')}
    </div>
  `;
}

function buildRow(subjectId, groupId, i, topicName) {
  const key = tKey(subjectId, groupId, i);
  const t   = getTopic(subjectId, groupId, i);
  return `
    <div class="table-row ${t.rr ? 'row-done' : ''}" data-key="${key}">
      <div class="col-topic topic-name">${topicName}</div>
      <div class="col-rr">
        <button class="rr-btn ${t.rr ? 'rr-done' : ''}"
          onclick="toggleRR('${subjectId}','${groupId}',${i})">
          ${t.rr ? '✓ Done' : 'Mark Done'}
        </button>
      </div>
      <div class="col-ans">
        <div class="counter-wrap">
          <button class="counter-btn" onclick="adjustTopic('${subjectId}','${groupId}',${i},'ans',-1)">−</button>
          <span class="counter-val">${t.ans || 0}</span>
          <button class="counter-btn" onclick="adjustTopic('${subjectId}','${groupId}',${i},'ans',1)">+</button>
        </div>
      </div>
      <div class="col-mcq">
        <div class="counter-wrap">
          <button class="counter-btn" onclick="adjustTopic('${subjectId}','${groupId}',${i},'mcq',-1)">−</button>
          <span class="counter-val">${t.mcq || 0}</span>
          <button class="counter-btn" onclick="adjustTopic('${subjectId}','${groupId}',${i},'mcq',1)">+</button>
        </div>
      </div>
    </div>
  `;
}

function toggleRR(subjectId, groupId, i) {
  const key = tKey(subjectId, groupId, i);
  const cur = getTopic(subjectId, groupId, i);
  state.topics[key] = { ...cur, rr: !cur.rr };
  saveLocal();
  renderSidebar();
  renderTopbar();
  const row = document.querySelector(`[data-key="${key}"]`);
  if (row) {
    let topicName = '';
    for (const sec of SECTIONS) {
      const subj = sec.subjects.find(s => s.id === subjectId);
      if (subj && subj.groups) {
        const g = subj.groups.find(g => g.id === groupId);
        if (g) { topicName = g.topics[i]; break; }
      }
    }
    row.outerHTML = buildRow(subjectId, groupId, i, topicName);
  }
}

function adjustTopic(subjectId, groupId, i, field, delta) {
  const key = tKey(subjectId, groupId, i);
  const cur = getTopic(subjectId, groupId, i);
  const val = Math.max(0, (cur[field] || 0) + delta);
  state.topics[key] = { ...cur, [field]: val };
  saveLocal();
  const row = document.querySelector(`[data-key="${key}"]`);
  if (row) {
    let topicName = '';
    for (const sec of SECTIONS) {
      const subj = sec.subjects.find(s => s.id === subjectId);
      if (subj && subj.groups) {
        const g = subj.groups.find(g => g.id === groupId);
        if (g) { topicName = g.topics[i]; break; }
      }
    }
    row.outerHTML = buildRow(subjectId, groupId, i, topicName);
  }
}

// ── CA PANEL ──────────────────────────────────────────────────────────────
let caViewMonth = null; // 'YYYY-MM', null = current month

function caStreak() {
  const today = todayStr();
  let streak = 0, d = new Date();
  while (true) {
    const s = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (s > today) { d.setDate(d.getDate()-1); continue; }
    if (state.ca[s]) { streak++; d.setDate(d.getDate()-1); }
    else break;
  }
  return streak;
}

function renderCAPanel(el) {
  const today = todayStr();
  const now   = new Date();
  const viewDate = caViewMonth ? new Date(caViewMonth + '-01') : new Date(now.getFullYear(), now.getMonth(), 1);
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed
  const monthStr = `${year}-${String(month+1).padStart(2,'0')}`;

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // shift so Mon=0

  // stats for this month
  let monthDone = 0, monthTotal = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${monthStr}-${String(d).padStart(2,'0')}`;
    if (ds > today) break;
    const startD = START_DATE > today ? today : START_DATE;
    if (ds < startD) continue;
    monthTotal++;
    if (state.ca[ds]) monthDone++;
  }

  // overall stats
  const startD = START_DATE > today ? today : START_DATE;
  const allDates = dateRange(startD, today);
  const totalDone = allDates.filter(d => !!state.ca[d]).length;
  const streak = caStreak();

  // build calendar cells
  const dayLabels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const cells = dayLabels.map(l => `<div class="ca-day-label">${l}</div>`).join('')
    + Array(startOffset).fill('<div class="ca-cell ca-cell-empty"></div>').join('')
    + Array.from({length: daysInMonth}, (_, idx) => {
        const d = idx + 1;
        const ds = `${monthStr}-${String(d).padStart(2,'0')}`;
        const isToday = ds === today;
        const isFuture = ds > today;
        const beforeStart = ds < startD;
        const done = !!state.ca[ds];
        let cls = 'ca-cell';
        if (isFuture || beforeStart) cls += ' ca-cell-future';
        else if (done) cls += ' ca-cell-done';
        else cls += ' ca-cell-miss';
        if (isToday) cls += ' ca-cell-today';
        const clickable = !isFuture && !beforeStart;
        return `<div class="${cls}" ${clickable ? `onclick="toggleCADate('${ds}')"` : ''}>
          <span class="ca-cell-num">${d}</span>
          ${done ? '<span class="ca-cell-tick">✓</span>' : ''}
        </div>`;
      }).join('');

  const prevMonth = new Date(year, month-1, 1);
  const nextMonth = new Date(year, month+1, 1);
  const prevStr = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth()+1).padStart(2,'0')}`;
  const nextStr = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth()+1).padStart(2,'0')}`;
  const monthLabel = viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const canGoNext = nextStr <= `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;

  el.innerHTML = `
    <div class="main-header">
      <h1 class="main-title">Current Affairs</h1>
      <div class="main-meta">
        <span class="pill pill-green">${totalDone} total done</span>
        <span class="pill pill-amber">${streak} day streak</span>
        <span class="pill pill-blue">${monthDone}/${monthTotal} this month</span>
      </div>
    </div>
    <div class="ca-calendar-wrap">
      <div class="ca-nav">
        <button class="ca-nav-btn" onclick="caNavigate('${prevStr}')">&#8592;</button>
        <span class="ca-nav-label">${monthLabel}</span>
        <button class="ca-nav-btn" onclick="caNavigate('${nextStr}')" ${!canGoNext ? 'disabled' : ''}>&#8594;</button>
      </div>
      <div class="ca-grid">${cells}</div>
    </div>
  `;
}

function caNavigate(monthStr) {
  caViewMonth = monthStr;
  renderCAPanel(document.getElementById('main'));
}

function toggleCADate(d) {
  if (state.ca[d]) delete state.ca[d];
  else state.ca[d] = true;
  saveLocal();
  markDirty();
  renderTopbar();
  renderCAPanel(document.getElementById('main'));
}

// ── ESSAYS PANEL ──────────────────────────────────────────────────────────
function renderEssaysPanel(el) {
  const count   = state.essays || 0;
  const history = state.essayDates || [];

  el.innerHTML = `
    <div class="main-header">
      <h1 class="main-title">Essays</h1>
      <div class="main-meta">
        <span class="pill pill-amber">${count} essays attempted</span>
      </div>
    </div>
    <div class="session-action">
      <div class="big-counter">
        <button class="big-counter-btn" onclick="adjustEssays(-1)">−</button>
        <span class="big-counter-val">${count}</span>
        <button class="big-counter-btn" onclick="adjustEssays(1)">+ Log Essay</button>
      </div>
    </div>
    <div class="session-history">
      <div class="group-label">History</div>
      ${history.length === 0
        ? '<div class="empty-msg">No essays logged yet.</div>'
        : history.map(d => `<div class="session-row">${fmtDate(d)}</div>`).join('')}
    </div>
  `;
}

function adjustEssays(delta) {
  if (delta > 0) {
    state.essays = (state.essays || 0) + 1;
    if (!state.essayDates) state.essayDates = [];
    state.essayDates.unshift(todayStr());
  } else {
    state.essays = Math.max(0, (state.essays || 0) - 1);
    if (state.essayDates && state.essayDates.length > 0) state.essayDates.shift();
  }
  saveLocal();
  renderEssaysPanel(document.getElementById('main'));
}

// ── CSAT PANEL ────────────────────────────────────────────────────────────
function renderCSATPanel(el) {
  const sessions = state.csat || [];
  const today    = todayStr();
  const doneToday = sessions.includes(today);

  el.innerHTML = `
    <div class="main-header">
      <h1 class="main-title">CSAT</h1>
      <div class="main-meta">
        <span class="pill pill-blue">${sessions.length} sessions done</span>
      </div>
    </div>
    <div class="session-action">
      <button class="btn-log ${doneToday ? 'done' : ''}" onclick="toggleCSATToday()">
        ${doneToday ? '✓ Done Today' : `+ Mark Today Done`}
      </button>
    </div>
    <div class="session-history">
      <div class="group-label">History</div>
      ${sessions.length === 0
        ? '<div class="empty-msg">No sessions logged yet.</div>'
        : sessions.map(d => `<div class="session-row">${fmtDate(d)}</div>`).join('')}
    </div>
  `;
}

function toggleCSATToday() {
  if (!state.csat) state.csat = [];
  const today = todayStr();
  const idx   = state.csat.indexOf(today);
  if (idx >= 0) state.csat.splice(idx, 1);
  else state.csat.unshift(today);
  saveLocal();
  renderCSATPanel(document.getElementById('main'));
}

// ── HOME ──────────────────────────────────────────────────────────────────
function renderHome(el) {
  const s   = overallStats();
  const pct = s.total ? Math.round(s.done / s.total * 100) : 0;

  el.innerHTML = `
    <div class="home-wrap">
      <div class="home-greeting">Welcome back, ${state.name || 'Hunter'}</div>
      <div class="home-stats">
        <div class="home-stat">
          <span class="home-stat-val">${s.done}</span>
          <span class="home-stat-lbl">Topics Done</span>
        </div>
        <div class="home-stat">
          <span class="home-stat-val" style="color:var(--amber)">${s.total - s.done}</span>
          <span class="home-stat-lbl">Remaining</span>
        </div>
        <div class="home-stat">
          <span class="home-stat-val" style="color:var(--green)">${s.ans}</span>
          <span class="home-stat-lbl">Answers</span>
        </div>
        <div class="home-stat">
          <span class="home-stat-val" style="color:var(--purple)">${s.mcq}</span>
          <span class="home-stat-lbl">MCQs</span>
        </div>
      </div>
      <div class="overview-list">
        ${SECTIONS.map(sec => {
          let total = 0, done = 0;
          sec.subjects.forEach(subj => { const st = subjectStats(subj); if (st) { total += st.total; done += st.done; } });
          const p = total ? Math.round(done / total * 100) : 0;
          return `
            <div class="overview-row">
              <span class="overview-sec">${sec.label}</span>
              <div class="overview-bar"><div class="overview-fill" style="width:${p}%"></div></div>
              <span class="overview-pct">${done}/${total}</span>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ── TOAST ─────────────────────────────────────────────────────────────────
let _toastTimer = null;
function showToast(msg, ok = true) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${ok ? 'ok' : 'err'}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ── RENDER ALL ────────────────────────────────────────────────────────────
function renderAll() {
  renderTopbar();
  renderSidebar();
  renderMain();
}

// ── KEYBOARD ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveAll(); }
});

// ── INIT ──────────────────────────────────────────────────────────────────
function init() {
  ghToken = localStorage.getItem('gh_token') || '';
  loadLocal();

  if (!ghToken || !state.name) {
    document.getElementById('setup-screen').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  } else {
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    renderAll();
    loadFromGitHub().then(ok => {
      renderAll();
      showToast(ok ? 'Loaded from GitHub' : 'Using local data', ok);
    });
  }
}

window.addEventListener('DOMContentLoaded', init);
