// ── QUEST RENDERING + TOPIC CLAIMING ─────────────────────────────────────

// -- claim-modal state --
let _claimQuestId    = null;
let _claimSubjectId  = null;
let _claimTopicId    = null;
let _claimStatus     = 1; // 1=read, 2=read+revised

function renderQuests() {
  const now = new Date();
  const dow  = now.getDay();
  const wk   = getWeekNumber(now);
  const last  = isLastWeekendOfMonth(now);
  const questIds = getQuestsForDay(dow, wk, last);

  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dateStr  = now.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });

  const container = document.getElementById('quests-section');
  if (!container) return;

  const xpToday = todayXP();

  container.innerHTML = `
    <div class="quests-header">
      <span class="quests-day-badge">${dayNames[dow]}</span>
      <span class="quests-date">${dateStr}</span>
      <span class="quests-xp-today">+${xpToday} XP today</span>
    </div>
    <div class="quests-grid">
      ${questIds.map(qid => renderQuestCard(qid)).join('')}
    </div>
  `;
}

function renderQuestCard(questId) {
  const def   = QUEST_DEFS[questId];
  if (!def) return '';
  const done  = isQuestDone(questId);
  const isClaimType = def.type === 'claim_topic' || def.type === 'claim_revision';
  const isMock      = def.type === 'mock_log';

  let claimedLabel = '';
  if (done && isClaimType) {
    const tk = getQuestTopicKey(questId);
    if (tk) {
      const [subjId, topicId] = tk.split(':');
      const subj = SUBJECTS.find(s => s.id === subjId);
      const tree = TOPIC_TREES[subjId];
      let topicName = topicId;
      if (tree) {
        for (const sec of tree.sections) {
          const t = sec.topics.find(t => t.id === topicId);
          if (t) { topicName = t.name; break; }
        }
      }
      claimedLabel = `<div class="quest-claimed-topic">↳ ${subj ? subj.name : subjId}: ${topicName}</div>`;
    }
  }

  const actionLabel = done
    ? (isClaimType ? 'DONE' : '✓')
    : (isClaimType ? 'CLAIM' : isMock ? 'LOG' : 'MARK');

  const classes = [
    'quest',
    done ? 'done' : '',
    isClaimType ? 'claim-type' : '',
  ].filter(Boolean).join(' ');

  const onclick = isMock
    ? `openMockModal()`
    : isClaimType
      ? `openClaimModal('${questId}')`
      : `toggleQuest('${questId}')`;

  return `
    <div class="${classes}" onclick="${onclick}">
      <div class="quest-icon">${done ? '✅' : def.icon}</div>
      <div class="quest-body">
        <div class="quest-title">${def.title}</div>
        <div class="quest-sub">${def.sub}</div>
        ${claimedLabel}
      </div>
      <div class="quest-xp">+${def.xp} XP</div>
      <div class="quest-action">${actionLabel}</div>
    </div>
  `;
}

// ── SIMPLE TOGGLE (check quests) ─────────────────────────────────────────
function toggleQuest(questId) {
  if (isQuestDone(questId)) return; // no un-checking once done
  const def = QUEST_DEFS[questId];
  if (!def) return;

  markQuestDone(questId);
  addXP(def.xp, `${def.icon} ${def.title} completed`);
  showXPPop(def.xp);
  saveLocal();
  renderQuests();
  renderHeader();
  renderLog();
}

// ── CLAIM MODAL — OPEN ────────────────────────────────────────────────────
function openClaimModal(questId) {
  if (isQuestDone(questId)) return;
  _claimQuestId   = questId;
  _claimSubjectId = null;
  _claimTopicId   = null;
  _claimStatus    = 1;

  const def = QUEST_DEFS[questId];
  const isRevision = def.type === 'claim_revision';

  document.getElementById('claim-modal-title').textContent =
    isRevision ? 'REVISE A TOPIC' : `CLAIM — ${def.title.toUpperCase()}`;

  _renderClaimModalBody(questId);
  document.getElementById('claim-modal').classList.add('open');
}

function _renderClaimModalBody(questId) {
  const def = QUEST_DEFS[questId];
  const isRevision = def.type === 'claim_revision';
  const body = document.getElementById('claim-modal-body');

  if (isRevision) {
    body.innerHTML = _buildRevisionPickerHTML();
  } else {
    body.innerHTML = _buildTopicPickerHTML(def.group);
  }
}

function _buildTopicPickerHTML(group) {
  // filter subjects by group
  let subjectPool;
  if (group === 'GS')     subjectPool = SUBJECTS.filter(s => GS_SUBJECT_IDS.includes(s.id));
  else if (group === 'PSIR')   subjectPool = SUBJECTS.filter(s => PSIR_SUBJECT_IDS.includes(s.id));
  else if (group === 'ETHICS') subjectPool = SUBJECTS.filter(s => s.id === 'ethics');
  else subjectPool = SUBJECTS;

  const subjectOptions = subjectPool.map(s =>
    `<option value="${s.id}" ${_claimSubjectId === s.id ? 'selected' : ''}>${s.name}</option>`
  ).join('');

  // topic list for current subject
  let topicListHTML = '';
  if (_claimSubjectId) {
    const tree = TOPIC_TREES[_claimSubjectId];
    if (tree) {
      topicListHTML = '<div class="topic-pick-list">';
      tree.sections.forEach(sec => {
        topicListHTML += `<div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:1px;padding:4px 12px 2px;text-transform:uppercase;">${sec.label}</div>`;
        sec.topics.forEach(t => {
          const st = getTopicStatus(_claimSubjectId, t.id);
          const sel = _claimTopicId === t.id ? 'selected' : '';
          const dot = st.s === 2 ? 'background:var(--gold)' : st.s === 1 ? 'background:var(--blue2)' : 'background:var(--border2)';
          topicListHTML += `
            <div class="topic-pick-item ${sel}" onclick="_selectClaimTopic('${t.id}')">
              <span class="tpi-status" style="${dot}"></span>
              <span>${t.name}</span>
            </div>`;
        });
      });
      topicListHTML += '</div>';
    }
  }

  const statusButtons = `
    <div class="topic-picker-section">
      <div class="topic-picker-section-label">Mark As</div>
      <div class="status-toggle">
        <div class="status-btn ${_claimStatus === 1 ? 'active-read' : ''}" onclick="_setClaimStatus(1)">📖 Read</div>
        <div class="status-btn ${_claimStatus === 2 ? 'active-revised' : ''}" onclick="_setClaimStatus(2)">✅ Read + Revised Today</div>
      </div>
    </div>`;

  return `
    <div class="topic-picker-section">
      <div class="topic-picker-section-label">Subject</div>
      <select class="modal-select" onchange="_selectClaimSubject(this.value)">
        <option value="">— choose subject —</option>
        ${subjectOptions}
      </select>
    </div>
    ${_claimSubjectId ? `
    <div class="topic-picker-section">
      <div class="topic-picker-section-label">Topic</div>
      ${topicListHTML}
    </div>` : ''}
    ${_claimTopicId ? statusButtons : ''}
  `;
}

function _buildRevisionPickerHTML() {
  // Show all topics with status >= 1 (read), allow upgrading to 2
  const readTopics = [];
  SUBJECTS.forEach(subj => {
    const all = allTopicsForSubject(subj.id);
    all.filter(t => t.s >= 1).forEach(t => {
      readTopics.push({ subjectId:subj.id, subjectName:subj.name, topicId:t.topicId, name:t.name, s:t.s });
    });
  });

  if (readTopics.length === 0) {
    return `<div style="text-align:center;color:var(--muted);font-size:12px;padding:20px;">
      No read topics yet — claim a morning read quest first.
    </div>`;
  }

  const items = readTopics.map(t => {
    const sel = (_claimSubjectId === t.subjectId && _claimTopicId === t.topicId) ? 'selected' : '';
    const dot = t.s === 2 ? 'background:var(--gold)' : 'background:var(--blue2)';
    const alreadyRev = t.s === 2 ? 'opacity:.5;' : '';
    return `
      <div class="topic-pick-item ${sel}" style="${alreadyRev}" onclick="_selectRevisionTopic('${t.subjectId}','${t.topicId}')">
        <span class="tpi-status" style="${dot}"></span>
        <span>${t.name}</span>
        <span class="tpi-section">${t.subjectName}</span>
      </div>`;
  }).join('');

  return `
    <div class="topic-picker-section">
      <div class="topic-picker-section-label">Pick a read topic to revise</div>
      <div class="topic-pick-list">${items}</div>
    </div>
  `;
}

// ── CLAIM MODAL — CALLBACKS ───────────────────────────────────────────────
function _selectClaimSubject(subjId) {
  _claimSubjectId = subjId || null;
  _claimTopicId   = null;
  document.getElementById('claim-modal-body').innerHTML =
    _buildTopicPickerHTML(QUEST_DEFS[_claimQuestId].group);
}

function _selectClaimTopic(topicId) {
  _claimTopicId = topicId;
  document.getElementById('claim-modal-body').innerHTML =
    _buildTopicPickerHTML(QUEST_DEFS[_claimQuestId].group);
}

function _setClaimStatus(s) {
  _claimStatus = s;
  document.getElementById('claim-modal-body').innerHTML =
    _buildTopicPickerHTML(QUEST_DEFS[_claimQuestId].group);
}

function _selectRevisionTopic(subjId, topicId) {
  _claimSubjectId = subjId;
  _claimTopicId   = topicId;
  document.getElementById('claim-modal-body').innerHTML = _buildRevisionPickerHTML();
}

// ── CLAIM MODAL — CONFIRM ─────────────────────────────────────────────────
function confirmClaim() {
  if (!_claimQuestId || !_claimSubjectId || !_claimTopicId) {
    alert('Please select a subject and topic first.');
    return;
  }
  const def = QUEST_DEFS[_claimQuestId];
  const isRevision = def.type === 'claim_revision';
  const tk = topicKey(_claimSubjectId, _claimTopicId);

  // get current status
  const existing = getTopicStatus(_claimSubjectId, _claimTopicId);
  const today = todayKey();

  if (isRevision) {
    // upgrade to revised
    setTopicStatus(_claimSubjectId, _claimTopicId, {
      s: 2,
      rd: existing.rd || today,
      rv: today,
    });
    const subj = SUBJECTS.find(s => s.id === _claimSubjectId);
    const topicName = _getTopicName(_claimSubjectId, _claimTopicId);
    addLog(`🔁 Revised: ${subj.name} → ${topicName}`, def.xp);
  } else {
    const newStatus = _claimStatus;
    setTopicStatus(_claimSubjectId, _claimTopicId, {
      s:  newStatus,
      rd: existing.rd || today,
      rv: newStatus === 2 ? today : existing.rv || null,
    });
    const subj = SUBJECTS.find(s => s.id === _claimSubjectId);
    const topicName = _getTopicName(_claimSubjectId, _claimTopicId);
    const label = newStatus === 2
      ? `📖✅ Read + Revised: ${subj.name} → ${topicName}`
      : `📖 Read: ${subj.name} → ${topicName}`;
    addLog(label, def.xp);
  }

  markQuestDone(_claimQuestId, tk);
  state.totalXP = (state.totalXP || 0) + def.xp;
  saveLocal();
  closeClaimModal();
  showXPPop(def.xp);
  renderAll();
}

function _getTopicName(subjectId, topicId) {
  const tree = TOPIC_TREES[subjectId];
  if (!tree) return topicId;
  for (const sec of tree.sections) {
    const t = sec.topics.find(t => t.id === topicId);
    if (t) return t.name;
  }
  return topicId;
}

function closeClaimModal() {
  document.getElementById('claim-modal').classList.remove('open');
  _claimQuestId = _claimSubjectId = _claimTopicId = null;
  _claimStatus = 1;
}
