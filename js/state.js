// ── STATE MANAGEMENT + GITHUB SYNC ────────────────────────────────────────

const GITHUB_USER = 'NaniChennuri';
const GITHUB_REPO = 'study-tracker';
const DATA_FILE   = 'tracker-data.json';

const DEFAULT_STATE = {
  hunterName:     '',
  totalXP:        0,
  streak:         0,
  totalDays:      0,
  lastStudyDate:  null,
  topicStatus:    {},   // key: 'subjectId:topicId' → { s:0|1|2, rd:null, rv:null }
  completedQuests:{},   // key: 'YYYY-MM-DD' → { questId: { done:true, topicKey?:'...' } }
  mockHistory:    [],
  bossDefeated:   {},   // key: subjectId → { score, date }
  activityLog:    [],
};

let state    = { ...DEFAULT_STATE };
let ghToken  = '';
let ghFileSHA = '';   // needed for GitHub PUT

// ── TOPIC KEY HELPERS ────────────────────────────────────────────────────
function topicKey(subjectId, topicId) {
  return `${subjectId}:${topicId}`;
}

function getTopicStatus(subjectId, topicId) {
  return state.topicStatus[topicKey(subjectId, topicId)] || { s:0, rd:null, rv:null };
}

function setTopicStatus(subjectId, topicId, statusObj) {
  state.topicStatus[topicKey(subjectId, topicId)] = statusObj;
}

// Return flat list of all topics for a subject with their status
function allTopicsForSubject(subjectId) {
  const tree = TOPIC_TREES[subjectId];
  if (!tree) return [];
  const out = [];
  tree.sections.forEach(sec => {
    sec.topics.forEach(t => {
      const st = getTopicStatus(subjectId, t.id);
      out.push({ subjectId, sectionId:sec.id, sectionLabel:sec.label, topicId:t.id, name:t.name, ...st });
    });
  });
  return out;
}

function countTopicsForSubject(subjectId) {
  const all = allTopicsForSubject(subjectId);
  const total    = all.length;
  const read     = all.filter(t => t.s >= 1).length;
  const revised  = all.filter(t => t.s >= 2).length;
  return { total, read, revised };
}

// ── QUEST HELPERS ────────────────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().slice(0,10); // YYYY-MM-DD
}

function getTodayQuests() {
  return state.completedQuests[todayKey()] || {};
}

function isQuestDone(questId) {
  const dq = getTodayQuests();
  return !!(dq[questId] && dq[questId].done);
}

function getQuestTopicKey(questId) {
  const dq = getTodayQuests();
  return dq[questId] && dq[questId].topicKey;
}

function markQuestDone(questId, topicKey = null) {
  const dk = todayKey();
  if (!state.completedQuests[dk]) state.completedQuests[dk] = {};
  state.completedQuests[dk][questId] = { done:true };
  if (topicKey) state.completedQuests[dk][questId].topicKey = topicKey;

  // update streak + totalDays
  _updateStreak();
}

function _updateStreak() {
  const today = todayKey();
  if (state.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0,10);
  state.streak = (state.lastStudyDate === yKey) ? state.streak + 1 : 1;
  state.totalDays = (state.totalDays || 0) + 1;
  state.lastStudyDate = today;
}

// ── XP ───────────────────────────────────────────────────────────────────
function addXP(amount, label = '') {
  state.totalXP = (state.totalXP || 0) + amount;
  addLog(label, amount);
  saveLocal();
}

function todayXP() {
  const dk = todayKey();
  const dq = state.completedQuests[dk] || {};
  return Object.keys(dq).reduce((sum, qid) => {
    const def = QUEST_DEFS[qid];
    return sum + (def && dq[qid].done ? def.xp : 0);
  }, 0);
}

// ── RANK ─────────────────────────────────────────────────────────────────
function getCurrentRank() {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (state.totalXP >= r.xpNeeded) rank = r;
  }
  return rank;
}

function getNextRank() {
  let next = null;
  for (const r of RANKS) {
    if (state.totalXP < r.xpNeeded) { next = r; break; }
  }
  return next;
}

// ── ACTIVITY LOG ─────────────────────────────────────────────────────────
function addLog(text, xp = 0) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
  state.activityLog = [{ time, text, xp }, ...(state.activityLog || [])].slice(0, 80);
}

// ── PERSISTENCE — LOCAL ───────────────────────────────────────────────────
function saveLocal() {
  localStorage.setItem('upsc_conquest_state', JSON.stringify(state));
}

function loadLocal() {
  try {
    const raw = localStorage.getItem('upsc_conquest_state');
    if (raw) {
      const loaded = JSON.parse(raw);
      state = { ...DEFAULT_STATE, ...loaded };
    }
  } catch(e) { /* ignore */ }
}

// ── PERSISTENCE — GITHUB ──────────────────────────────────────────────────
async function saveToGitHub() {
  if (!ghToken) return false;
  try {
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(state, null, 2))));
    const body = { message:`update: ${todayKey()}`, content };
    if (ghFileSHA) body.sha = ghFileSHA;

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
      {
        method:'PUT',
        headers:{
          Authorization:`token ${ghToken}`,
          Accept:'application/vnd.github.v3+json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      const json = await res.json();
      ghFileSHA = json.content.sha;
      return true;
    }
    return false;
  } catch(e) { return false; }
}

async function loadFromGitHub() {
  if (!ghToken) return false;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${DATA_FILE}`,
      { headers:{ Authorization:`token ${ghToken}`, Accept:'application/vnd.github.v3+json' } }
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

// ── INIT ─────────────────────────────────────────────────────────────────
function initState() {
  ghToken = localStorage.getItem('gh_token') || '';
  loadLocal();
}

// ── WEEK HELPERS ─────────────────────────────────────────────────────────
function getWeekNumber(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

function isLastWeekendOfMonth(d = new Date()) {
  const next7 = new Date(d);
  next7.setDate(d.getDate() + 7);
  return next7.getMonth() !== d.getMonth();
}

function getExamDaysLeft() {
  const exam = new Date(EXAM_DATE);
  const today = new Date();
  today.setHours(0,0,0,0);
  exam.setHours(0,0,0,0);
  return Math.max(0, Math.round((exam - today) / 86400000));
}
