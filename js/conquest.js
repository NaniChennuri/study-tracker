// ── CONQUEST MAP + TOPIC DETAIL MODAL ────────────────────────────────────

// topic tooltip element
let _tooltip = null;
// current topic detail modal state
let _detailSubjectId = null;
let _detailTopicId   = null;

// multi-select mode state
let _selectMode = false;
let _selectedTopics = new Set(); // keys of topicKey(subjectId, topicId)

function renderConquestMap() {
  const container = document.getElementById('conquest-section');
  if (!container) return;

  // overall stats
  let totalTopics = 0, totalRead = 0, totalRevised = 0, bossesDefeated = 0;
  SUBJECTS.forEach(s => {
    const c = countTopicsForSubject(s.id);
    totalTopics  += c.total;
    totalRead    += c.read;
    totalRevised += c.revised;
  });
  bossesDefeated = Object.keys(state.bossDefeated || {}).length;

  const statsHTML = `
    <div class="conquest-stats-row">
      <div class="conquest-stat">
        <span class="conquest-stat-value" style="color:var(--cyan)">${totalTopics}</span>
        <span class="conquest-stat-label">Total Topics</span>
      </div>
      <div class="conquest-stat">
        <span class="conquest-stat-value" style="color:var(--blue)">${totalRead}</span>
        <span class="conquest-stat-label">Read</span>
      </div>
      <div class="conquest-stat">
        <span class="conquest-stat-value" style="color:var(--gold)">${totalRevised}</span>
        <span class="conquest-stat-label">Revised</span>
      </div>
      <div class="conquest-stat">
        <span class="conquest-stat-value" style="color:var(--green)">${Math.round(totalRead/totalTopics*100) || 0}%</span>
        <span class="conquest-stat-label">Coverage</span>
      </div>
      <div class="conquest-stat">
        <span class="conquest-stat-value" style="color:var(--red)">${bossesDefeated}</span>
        <span class="conquest-stat-label">Bosses Defeated</span>
      </div>
    </div>
  `;

  const toolbarHTML = `
    <div class="conquest-toolbar">
      <button class="select-mode-btn ${_selectMode ? 'active' : ''}" onclick="toggleSelectMode()">
        ${_selectMode ? '✕ Exit Select Mode' : '☑ Select Multiple'}
      </button>
      ${_selectMode ? `<span class="select-mode-hint">Click topic boxes to select them, then apply a status below.</span>` : ''}
    </div>
  `;

  const groupsHTML = SUBJECT_GROUPS.map(g => renderConquestGroup(g)).join('');

  container.innerHTML = statsHTML + toolbarHTML + groupsHTML;

  // init tooltip
  if (!_tooltip) {
    _tooltip = document.createElement('div');
    _tooltip.className = 'topic-tooltip';
    document.body.appendChild(_tooltip);
  }

  _renderSelectBar();
}

function renderConquestGroup(group) {
  const subjects = SUBJECTS.filter(s => group.ids.includes(s.id));

  // group totals
  let gRead = 0, gTotal = 0;
  subjects.forEach(s => {
    const c = countTopicsForSubject(s.id);
    gRead += c.read; gTotal += c.total;
  });

  const cardsHTML = subjects.map(s => renderSubjectCard(s)).join('');

  return `
    <div class="conquest-group">
      <div class="conquest-group-header">
        <span class="conquest-group-tag" style="border-color:${group.color};color:${group.color}">${group.tag}</span>
        <span class="conquest-group-label">${group.label}</span>
        <span class="conquest-group-stats">${gRead}/${gTotal} read</span>
      </div>
      <div class="conquest-cards">${cardsHTML}</div>
    </div>
  `;
}

function renderSubjectCard(subj) {
  const counts  = countTopicsForSubject(subj.id);
  const { total, read, revised } = counts;
  const pct     = total > 0 ? Math.round(read / total * 100) : 0;
  const allRead = total > 0 && read === total;
  const boss    = (state.bossDefeated || {})[subj.id];
  const bossReady = allRead && !boss;

  const cardClass = ['subj-card', bossReady ? 'boss-ready' : '', boss ? 'boss-defeated' : ''].filter(Boolean).join(' ');

  // progress bar
  const barFill = `<div class="subj-progress-fill ${pct === 100 ? 'full' : ''}" style="width:${pct}%"></div>`;

  // topic grid
  const tree = TOPIC_TREES[subj.treeKey];
  let gridHTML = '<div class="topic-grid">';
  if (tree) {
    tree.sections.forEach(sec => {
      gridHTML += `<div class="topic-section-label">${sec.label}</div>`;
      sec.topics.forEach(t => {
        const st = getTopicStatus(subj.id, t.id);
        const cssClass = TOPIC_STATUS[st.s].cssClass;
        const isSelected = _selectedTopics.has(topicKey(subj.id, t.id));
        const clickHandler = _selectMode
          ? `toggleTopicSelect('${subj.id}','${t.id}')`
          : `openTopicDetail('${subj.id}','${t.id}')`;
        gridHTML += `<div class="topic-cell ${cssClass} ${isSelected ? 'selected' : ''}"
          data-subj="${subj.id}" data-topic="${t.id}" data-name="${t.name.replace(/"/g,'&quot;')}"
          onclick="${clickHandler}"
          onmouseenter="showTooltip(event,'${t.name.replace(/'/g,'&#39;')}')"
          onmouseleave="hideTooltip()"></div>`;
      });
      gridHTML += `<div class="topic-section-break"></div>`;
    });
  }
  gridHTML += '</div>';

  // badges
  let bossBadge = '';
  if (boss) {
    bossBadge = `<span class="boss-badge defeated">⚔ ${boss.score}% — DEFEATED</span>`;
  } else if (bossReady) {
    bossBadge = `<span class="boss-badge ready">BOSS READY</span>`;
  }

  // footer
  const footerBossBtn = bossReady
    ? `<button class="boss-raid-btn" onclick="openBossRaid('${subj.id}')">⚔ BOSS RAID</button>` : '';

  const pctColor = pct === 100 ? 'var(--gold)' : pct >= 50 ? 'var(--cyan)' : 'var(--muted)';

  return `
    <div class="${cardClass}">
      <div class="subj-card-hdr">
        <span class="subj-card-name" style="color:${subj.color}">${subj.name}</span>
        <span class="subj-card-group" style="border-color:${subj.color};color:${subj.color}">${subj.group}</span>
        ${bossBadge}
        <span class="subj-card-counts">${read}/${total}</span>
      </div>
      <div class="subj-progress-bar">${barFill}</div>
      ${gridHTML}
      <div class="subj-card-footer">
        <span class="read-count">▶ ${read} read</span>
        <span class="rev-count">✓ ${revised} revised</span>
        <span class="pct" style="color:${pctColor}">${pct}%</span>
        ${footerBossBtn}
      </div>
    </div>
  `;
}

// ── TOOLTIP ───────────────────────────────────────────────────────────────
function showTooltip(evt, name) {
  if (!_tooltip) return;
  _tooltip.textContent = name;
  _tooltip.classList.add('show');
  _positionTooltip(evt);
}

function _positionTooltip(evt) {
  if (!_tooltip) return;
  const x = evt.clientX + 14;
  const y = evt.clientY - 28;
  _tooltip.style.left = x + 'px';
  _tooltip.style.top  = y + 'px';
}

function hideTooltip() {
  if (_tooltip) _tooltip.classList.remove('show');
}

// ── MULTI-SELECT MODE ─────────────────────────────────────────────────────
function toggleSelectMode() {
  _selectMode = !_selectMode;
  if (!_selectMode) _selectedTopics.clear();
  renderConquestMap();
}

function toggleTopicSelect(subjectId, topicId) {
  const key = topicKey(subjectId, topicId);
  if (_selectedTopics.has(key)) _selectedTopics.delete(key);
  else _selectedTopics.add(key);
  renderConquestMap();
}

function clearSelection() {
  _selectedTopics.clear();
  renderConquestMap();
}

function _renderSelectBar() {
  let bar = document.getElementById('bulk-select-bar');
  if (!_selectMode || _selectedTopics.size === 0) {
    if (bar) bar.remove();
    return;
  }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'bulk-select-bar';
    bar.className = 'bulk-select-bar';
    document.body.appendChild(bar);
  }
  const n = _selectedTopics.size;
  bar.innerHTML = `
    <span class="bulk-select-count">${n} topic${n === 1 ? '' : 's'} selected</span>
    <button class="bulk-select-btn mark-read"    onclick="bulkApplyStatus(1)">Mark as Read</button>
    <button class="bulk-select-btn mark-revised" onclick="bulkApplyStatus(2)">Read + Revised</button>
    <button class="bulk-select-btn mark-unread"  onclick="bulkApplyStatus(0)">Reset to Unread</button>
    <button class="bulk-select-btn clear"        onclick="clearSelection()">Clear</button>
  `;
}

function bulkApplyStatus(newStatus) {
  if (_selectedTopics.size === 0) return;
  const today = todayKey();
  let count = 0;

  _selectedTopics.forEach(key => {
    const sepIdx = key.indexOf(':');
    const subjectId = key.slice(0, sepIdx);
    const topicId   = key.slice(sepIdx + 1);
    const existing = getTopicStatus(subjectId, topicId);
    setTopicStatus(subjectId, topicId, {
      s:  newStatus,
      rd: newStatus >= 1 ? (existing.rd || today) : null,
      rv: newStatus >= 2 ? (existing.rv || today)  : null,
    });
    count++;
  });

  let xpGained = 0;
  let verb = '↩ Bulk Reset';
  if (newStatus === 1) { xpGained = count * 10; verb = '📖 Bulk Read'; }
  else if (newStatus === 2) { xpGained = count * 15; verb = '✅ Bulk Revised'; }

  if (xpGained > 0) {
    state.totalXP = (state.totalXP || 0) + xpGained;
    showXPPop(xpGained);
  }
  addLog(`${verb}: ${count} topic${count === 1 ? '' : 's'}`, xpGained);

  _selectedTopics.clear();
  _selectMode = false;

  saveLocal();
  renderConquestMap();
  renderHeader();
  renderLog();
}

// ── TOPIC DETAIL MODAL ────────────────────────────────────────────────────
function openTopicDetail(subjectId, topicId) {
  _detailSubjectId = subjectId;
  _detailTopicId   = topicId;
  _renderTopicDetailModal();
  document.getElementById('topic-detail-modal').classList.add('open');
}

function _renderTopicDetailModal() {
  const subj  = SUBJECTS.find(s => s.id === _detailSubjectId);
  const tree  = TOPIC_TREES[_detailSubjectId];
  let topicName = _detailTopicId, sectionLabel = '';
  if (tree) {
    for (const sec of tree.sections) {
      const t = sec.topics.find(t => t.id === _detailTopicId);
      if (t) { topicName = t.name; sectionLabel = sec.label; break; }
    }
  }

  const st = getTopicStatus(_detailSubjectId, _detailTopicId);
  const pill = `<div class="topic-status-pill ${TOPIC_STATUS[st.s].cssClass}">${TOPIC_STATUS[st.s].label}</div>`;

  const dateInfo = [
    st.rd ? `Read on: ${st.rd}` : 'Not yet read',
    st.rv ? `Revised on: ${st.rv}` : '',
  ].filter(Boolean).join('<br>');

  // action buttons
  let actions = '';
  if (st.s < 1) {
    actions = `
      <button class="topic-action-btn mark-read"    onclick="_markTopicFromModal(1)">Mark as Read</button>
      <button class="topic-action-btn mark-revised" onclick="_markTopicFromModal(2)">Read + Revised Today</button>`;
  } else if (st.s < 2) {
    actions = `
      <button class="topic-action-btn mark-revised" onclick="_markTopicFromModal(2)">Mark Revised</button>
      <button class="topic-action-btn mark-unread"  onclick="_markTopicFromModal(0)">Reset to Unread</button>`;
  } else {
    actions = `
      <button class="topic-action-btn mark-unread"  onclick="_markTopicFromModal(0)">Reset to Unread</button>`;
  }

  document.getElementById('topic-detail-body').innerHTML = `
    <div class="topic-detail-subject">${subj ? subj.name : ''} — ${subj ? subj.group : ''}</div>
    <div class="topic-detail-section">${sectionLabel}</div>
    <div class="topic-detail-name">${topicName}</div>
    <div class="topic-status-display">${pill}</div>
    <div class="topic-date-info">${dateInfo}</div>
    <div class="topic-action-btns">${actions}</div>
  `;
}

function _markTopicFromModal(newStatus) {
  const today = todayKey();
  const existing = getTopicStatus(_detailSubjectId, _detailTopicId);
  const topicName = _getTopicNameConquest(_detailSubjectId, _detailTopicId);
  const subj = SUBJECTS.find(s => s.id === _detailSubjectId);

  setTopicStatus(_detailSubjectId, _detailTopicId, {
    s:  newStatus,
    rd: newStatus >= 1 ? (existing.rd || today) : null,
    rv: newStatus >= 2 ? (existing.rv || today)  : null,
  });

  if (newStatus === 0) {
    addLog(`↩ Reset: ${subj ? subj.name : ''} → ${topicName}`, 0);
  } else if (newStatus === 1) {
    addLog(`📖 Read: ${subj ? subj.name : ''} → ${topicName}`, 10);
    state.totalXP = (state.totalXP || 0) + 10;
    showXPPop(10);
  } else if (newStatus === 2) {
    addLog(`✅ Revised: ${subj ? subj.name : ''} → ${topicName}`, 15);
    state.totalXP = (state.totalXP || 0) + 15;
    showXPPop(15);
  }

  saveLocal();
  _renderTopicDetailModal();
  renderConquestMap();
  renderHeader();
  renderLog();
}

function _getTopicNameConquest(subjectId, topicId) {
  const tree = TOPIC_TREES[subjectId];
  if (!tree) return topicId;
  for (const sec of tree.sections) {
    const t = sec.topics.find(t => t.id === topicId);
    if (t) return t.name;
  }
  return topicId;
}

function closeTopicDetailModal() {
  document.getElementById('topic-detail-modal').classList.remove('open');
  _detailSubjectId = _detailTopicId = null;
}

// ── BOSS RAID MODAL ───────────────────────────────────────────────────────
let _bossSubjectId = null;

function openBossRaid(subjectId) {
  _bossSubjectId = subjectId;
  const subj = SUBJECTS.find(s => s.id === subjectId);

  document.getElementById('boss-subject-name').textContent = subj ? subj.name.toUpperCase() : '';
  document.getElementById('boss-score-input').value = '';
  document.getElementById('boss-result').className = 'boss-result';

  document.getElementById('boss-modal').classList.add('open');
}

function submitBossRaid() {
  const scoreVal = parseInt(document.getElementById('boss-score-input').value, 10);
  if (isNaN(scoreVal) || scoreVal < 0 || scoreVal > 100) {
    alert('Enter a score between 0 and 100.');
    return;
  }

  const won = scoreVal >= BOSS_WIN_SCORE;
  const subj = SUBJECTS.find(s => s.id === _bossSubjectId);
  const resultEl = document.getElementById('boss-result');

  if (won) {
    state.bossDefeated = state.bossDefeated || {};
    state.bossDefeated[_bossSubjectId] = { score: scoreVal, date: todayKey() };
    addLog(`⚔ BOSS DEFEATED: ${subj ? subj.name : ''} — ${scoreVal}%`, 100);
    state.totalXP = (state.totalXP || 0) + 100;
    resultEl.className = 'boss-result win';
    resultEl.textContent = `🏆 BOSS DEFEATED! +100 XP — ${subj ? subj.name : ''} CLEARED`;
    showXPPop(100);
  } else {
    addLog(`⚔ Boss attempt: ${subj ? subj.name : ''} — ${scoreVal}% (need ${BOSS_WIN_SCORE}%)`, 20);
    state.totalXP = (state.totalXP || 0) + 20;
    resultEl.className = 'boss-result fail';
    resultEl.textContent = `💢 Not yet — ${scoreVal}% / ${BOSS_WIN_SCORE}% needed. +20 XP for trying.`;
    showXPPop(20);
  }

  saveLocal();
  renderConquestMap();
  renderHeader();
  renderLog();

  // auto-close after 2s on win
  if (won) setTimeout(() => closeBossModal(), 2200);
}

function closeBossModal() {
  document.getElementById('boss-modal').classList.remove('open');
  _bossSubjectId = null;
}
