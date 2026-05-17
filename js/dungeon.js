// ── MOCK TEST LOGGING (Weekly Dungeon) ───────────────────────────────────

let _mockSubjectSelected = null;

function renderDungeon() {
  const container = document.getElementById('dungeon-section');
  if (!container) return;

  const subjectOptions = SUBJECTS.map(s =>
    `<option value="${s.id}">${s.name} (${s.group})</option>`
  ).join('');

  const historyHTML = renderMockHistory();

  container.innerHTML = `
    <div class="dungeon-panel">
      <div class="dungeon-header">
        <div class="dungeon-icon">⚔️</div>
        <div>
          <div class="dungeon-title">DUNGEON RAID — Mock Test Log</div>
          <div class="dungeon-sub">Log any mock, test or practice session result</div>
        </div>
      </div>
      <div class="dungeon-form">
        <div class="df-group">
          <div class="df-label">Type</div>
          <select class="df-input" id="mock-type" style="width:160px" onchange="updateMockForm()">
            <option value="Random Test">Random Test</option>
            <option value="Subject-Wise">Subject-Wise</option>
            <option value="General Studies">Full GS Mock</option>
            <option value="PSIR">PSIR Mock</option>
            <option value="CSAT">CSAT</option>
          </select>
        </div>
        <div class="df-group" id="mock-subject-group" style="display:none">
          <div class="df-label">Subject</div>
          <select class="df-input" id="mock-subject" style="width:160px">
            ${subjectOptions}
          </select>
        </div>
        <div class="df-group">
          <div class="df-label">Score %</div>
          <input class="df-input" type="number" id="mock-score" min="0" max="100"
            placeholder="65" style="width:80px"/>
        </div>
        <div class="df-group">
          <div class="df-label">Total Qs</div>
          <input class="df-input" type="number" id="mock-total" min="0"
            placeholder="100" style="width:80px"/>
        </div>
        <button class="df-btn" onclick="logMock()">LOG RAID</button>
      </div>
      <div id="mock-history-container">${historyHTML}</div>
    </div>
  `;
}

function updateMockForm() {
  const type = document.getElementById('mock-type')?.value;
  const subjGrp = document.getElementById('mock-subject-group');
  if (subjGrp) subjGrp.style.display = type === 'Subject-Wise' ? 'flex' : 'none';
}

function renderMockHistory() {
  const history = (state.mockHistory || []).slice(0, 15);
  if (history.length === 0) {
    return '<div class="mock-empty">No raids logged yet. Fight your first dungeon!</div>';
  }

  const rows = history.map(m => {
    const score = m.score;
    const cls   = score >= 70 ? 'pass' : score >= 50 ? 'warn' : 'fail';
    const subj  = m.subjectId ? ` — ${m.subjectName || m.subjectId}` : '';
    return `
      <div class="mock-entry">
        <span class="mock-entry-type">${m.type}</span>
        <span class="mock-entry-subj">${subj}</span>
        <span class="mock-entry-score ${cls}">${score}%</span>
        <span class="mock-entry-date">${m.date}</span>
      </div>`;
  }).join('');

  return `<div class="mock-history">${rows}</div>`;
}

function logMock() {
  const type  = document.getElementById('mock-type')?.value || 'Random Test';
  const score = parseInt(document.getElementById('mock-score')?.value, 10);
  const total = parseInt(document.getElementById('mock-total')?.value, 10) || null;

  if (isNaN(score) || score < 0 || score > 100) {
    alert('Enter a valid score (0–100).');
    return;
  }

  let subjectId   = null;
  let subjectName = null;
  if (type === 'Subject-Wise') {
    subjectId = document.getElementById('mock-subject')?.value;
    const subj = SUBJECTS.find(s => s.id === subjectId);
    subjectName = subj ? subj.name : subjectId;
  }

  const xp = score >= 70 ? 50 : score >= 50 ? 30 : 15;

  state.mockHistory = [
    {
      type, subjectId, subjectName, score,
      total: total || null,
      date: todayKey(),
    },
    ...(state.mockHistory || []),
  ].slice(0, 50);

  state.totalXP = (state.totalXP || 0) + xp;
  const scoreLabel = subjectName ? `${type} — ${subjectName}` : type;
  addLog(`⚔ Mock logged: ${scoreLabel} — ${score}%`, xp);
  showXPPop(xp);

  saveLocal();
  renderDungeon();
  renderHeader();
  renderLog();
}

// ── MOCK MODAL (from weekend quest) ──────────────────────────────────────
function openMockModal() {
  // Just scroll to the dungeon section for now
  document.getElementById('dungeon-section')?.scrollIntoView({ behavior:'smooth' });
}
