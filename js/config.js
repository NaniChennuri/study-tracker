// ── SUBJECT REGISTRY ──────────────────────────────────────────────────────
// Links tracker subjects to topic tree keys and display metadata
const SUBJECTS = [
  { id:'history',    name:'History',              treeKey:'history',    group:'GS-1', color:'#00d4ff' },
  { id:'polity',     name:'Polity',               treeKey:'polity',     group:'GS-2', color:'#4a9eff' },
  { id:'economy',    name:'Economy',              treeKey:'economy',    group:'GS-3', color:'#00ff88' },
  { id:'geography',  name:'Geography',            treeKey:'geography',  group:'GS-1', color:'#00d4ff' },
  { id:'ethics',     name:'Ethics',               treeKey:'ethics',     group:'GS-4', color:'#ffd700' },
  { id:'environment',name:'Environment',          treeKey:'environment',group:'GS-3', color:'#00ff88' },
  { id:'science',    name:'Science and Tech',     treeKey:'science',    group:'GS-3', color:'#00ff88' },
  { id:'society',    name:'Society and SJ',       treeKey:'society',    group:'GS-1', color:'#00d4ff' },
  { id:'governance', name:'Governance',           treeKey:'governance', group:'GS-2', color:'#4a9eff' },
  { id:'disaster',   name:'Disaster Management',  treeKey:'disaster',   group:'GS-3', color:'#00ff88' },
  { id:'security',   name:'Internal Security',    treeKey:'security',   group:'GS-3', color:'#00ff88' },
  { id:'psir1a',     name:'PSIR 1A',              treeKey:'psir1a',     group:'OPT',  color:'#9b59ff' },
  { id:'psir1b',     name:'PSIR 1B',              treeKey:'psir1b',     group:'OPT',  color:'#9b59ff' },
  { id:'psir2a',     name:'PSIR 2A',              treeKey:'psir2a',     group:'OPT',  color:'#9b59ff' },
  { id:'psir2b',     name:'PSIR 2B',              treeKey:'psir2b',     group:'OPT',  color:'#9b59ff' },
];

// Subject groups for conquest map layout
const SUBJECT_GROUPS = [
  { tag:'GS-1', label:'History, Culture and Geography', color:'#00d4ff',
    ids:['history','geography','society'] },
  { tag:'GS-2', label:'Polity and Governance',          color:'#4a9eff',
    ids:['polity','governance'] },
  { tag:'GS-3', label:'Economy, Environment and Security', color:'#00ff88',
    ids:['economy','environment','science','disaster','security'] },
  { tag:'GS-4', label:'Ethics',                          color:'#ffd700',
    ids:['ethics'] },
  { tag:'OPT',  label:'PSIR — Optional',                 color:'#9b59ff',
    ids:['psir1a','psir1b','psir2a','psir2b'] },
];

// Which GS subject IDs appear in morning read on GS days (MON/WED/FRI/SAT)
const GS_SUBJECT_IDS = ['history','polity','economy','geography','environment','science','society','governance','disaster','security'];
const PSIR_SUBJECT_IDS = ['psir1a','psir1b','psir2a','psir2b'];

// ── RANKS ─────────────────────────────────────────────────────────────────
const RANKS = [
  { rank:'E',  name:'E-Rank Hunter',   info:'Just awakened',       xpNeeded:0,     color:'#888' },
  { rank:'D',  name:'D-Rank Hunter',   info:'Showing promise',     xpNeeded:500,   color:'#4a9eff' },
  { rank:'C',  name:'C-Rank Hunter',   info:'Building strength',   xpNeeded:1500,  color:'#00d4ff' },
  { rank:'B',  name:'B-Rank Hunter',   info:'Reliable combatant',  xpNeeded:3500,  color:'#9b59ff' },
  { rank:'A',  name:'A-Rank Hunter',   info:'Elite hunter',        xpNeeded:7000,  color:'#ffd700' },
  { rank:'S',  name:'S-Rank Hunter',   info:'Prelims cleared',     xpNeeded:12000, color:'#ff4455' },
  { rank:'S+', name:'National Hunter', info:'Mains written',       xpNeeded:20000, color:'#ff8800' },
];

// ── DAILY QUEST DEFINITIONS ───────────────────────────────────────────────
// type: 'check'          → simple checkbox
//       'claim_topic'    → opens topic-picker modal, marks a topic read
//       'claim_revision' → opens picker of already-read topics, upgrades to revised
//       'mock_log'       → opens mock test logging panel

const QUEST_DEFS = {
  morning_gs: {
    id:'morning_gs', title:'GS Topic Read', sub:'60 min morning read — GS subject',
    xp:30, type:'claim_topic', group:'GS', icon:'📖',
  },
  morning_psir: {
    id:'morning_psir', title:'PSIR Topic Read', sub:'60 min — current paper',
    xp:30, type:'claim_topic', group:'PSIR', icon:'📖',
  },
  morning_ethics: {
    id:'morning_ethics', title:'Ethics Topic Read', sub:'60 min — Ethics morning',
    xp:30, type:'claim_topic', group:'ETHICS', icon:'📖',
  },
  editorial: {
    id:'editorial', title:'Editorial', sub:'30 min — The Hindu',
    xp:10, type:'check', icon:'📰',
  },
  revise: {
    id:'revise', title:'Revise a Topic', sub:'Night session — recall any read topic',
    xp:20, type:'claim_revision', icon:'🔁',
  },
  ca: {
    id:'ca', title:'Current Affairs', sub:'Insights daily — 20 min',
    xp:10, type:'check', icon:'🗞️',
  },
  mcq_practice: {
    id:'mcq_practice', title:'MCQ Practice', sub:'On today\'s topic',
    xp:15, type:'check', icon:'✏️',
  },
  answer_writing: {
    id:'answer_writing', title:'Answer Writing', sub:'Write one full answer',
    xp:25, type:'check', icon:'✍️',
  },
  weekly_mock: {
    id:'weekly_mock', title:'Weekly Mock Test', sub:'90 min timed + analysis',
    xp:50, type:'mock_log', icon:'⚔️',
  },
  csat_practice: {
    id:'csat_practice', title:'CSAT Practice', sub:'Fortnightly — alternates with Essay',
    xp:20, type:'check', icon:'🧮',
  },
  essay_writing: {
    id:'essay_writing', title:'Essay Writing', sub:'Fortnightly — alternates with CSAT',
    xp:25, type:'check', icon:'📝',
  },
  ca_monthly: {
    id:'ca_monthly', title:'CA Monthly Compilation', sub:'Last weekend of month',
    xp:30, type:'check', icon:'📅',
  },
};

// ── QUESTS BY DAY ─────────────────────────────────────────────────────────
// Returns quest IDs for a given day-of-week (0=Sun…6=Sat) + week context
function getQuestsForDay(dayOfWeek, weekNumber, isLastWeekendOfMonth) {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  // Fortnightly: odd week = CSAT, even week = Essay
  const fortnightlyQuest = weekNumber % 2 === 1 ? 'csat_practice' : 'essay_writing';

  switch (dayOfWeek) {
    case 1: // Monday — GS
    case 3: // Wednesday — GS
    case 5: // Friday — GS
      return ['morning_gs','editorial','revise','ca','mcq_practice','answer_writing'];

    case 2: // Tuesday — PSIR
    case 4: // Thursday — PSIR
      return ['morning_psir','editorial','revise','ca','mcq_practice','answer_writing'];

    case 0: { // Sunday — Ethics + weekend extras
      const q = ['morning_ethics','editorial','revise','ca','weekly_mock',fortnightlyQuest];
      if (isLastWeekendOfMonth) q.push('ca_monthly');
      return q;
    }
    case 6: { // Saturday — GS + weekend extras
      const q = ['morning_gs','editorial','revise','ca','weekly_mock',fortnightlyQuest];
      if (isLastWeekendOfMonth) q.push('ca_monthly');
      return q;
    }
    default:
      return ['morning_gs','editorial','revise','ca','mcq_practice','answer_writing'];
  }
}

// ── TOPIC STATUS LABELS ───────────────────────────────────────────────────
const TOPIC_STATUS = {
  0: { label:'Not Started', cssClass:'ts-none',     color:'#1a2540' },
  1: { label:'Read',        cssClass:'ts-read',     color:'#2060cc' },
  2: { label:'Revised',     cssClass:'ts-revised',  color:'#ffd700' },
};

// ── BOSS FIGHT THRESHOLD ──────────────────────────────────────────────────
// Subject boss raid unlocks when this % of topics are at least status=1
const BOSS_UNLOCK_THRESHOLD = 1.0; // 100% topics read
const BOSS_WIN_SCORE = 70;          // % score to "defeat" boss

// ── EXAM COUNTDOWN TARGET ─────────────────────────────────────────────────
// UPSC Prelims 2026 — update as needed
const EXAM_DATE = '2026-05-25';
