'use strict';

const DESKS = [
  { name: 'Reporting Desk', subtitle: 'Gather information and produce stories.', color: '#07863f', tasks: [
    ['Research & Source Discovery', 'Find background, documents, experts, and sources.'],
    ['Interview Processing', 'Conduct, transcribe, summarize, and organize interviews.'],
    ['Document Review', 'Review reports, filings, studies, records, and primary documents.'],
    ['Data Gathering & Analysis', 'Collect, organize, and analyze data for patterns and insights.'],
    ['News Writing', 'Draft stories based on gathered information.'] ] },
  { name: 'Editing Desk', subtitle: 'Set priorities and strengthen accuracy.', color: '#1764c0', tasks: [
    ['Editorial Planning', 'Decide newsroom priorities and allocate coverage resources.'],
    ['Story Editing', 'Improve clarity, structure, and readability.'],
    ['Fact Checking', 'Verify claims and evidence.'],
    ['Bias & Fairness Review', 'Assess framing, balance, and missing perspectives.'],
    ['Content Selection', 'Decide what gets published, promoted, and given prominence.'] ] },
  { name: 'Packaging Desk', subtitle: 'Shape how stories appear.', color: '#fa6700', tasks: [
    ['Headline Writing', 'Create titles and subheads.'],
    ['Story Summarization', 'Produce previews, abstracts, and key takeaways.'],
    ['Visual Creation', 'Create images, graphics, charts, and thumbnails.'],
    ['Format Adaptation', 'Adapt content for newsletters, video, mobile, social, and more.'],
    ['Story Promotion', 'Create teasers, captions, and push notifications.'] ] },
  { name: 'Audience Desk', subtitle: 'Distribute stories and build relationships.', color: '#d60b71', tasks: [
    ['Search Optimization', 'Improve discoverability through search.'],
    ['Social Distribution', 'Publish and adapt content for social platforms.'],
    ['Audience Targeting', 'Decide which audiences receive content.'],
    ['Performance Analysis', 'Monitor engagement and audience behavior.'],
    ['Community Management', 'Manage comments, audience interactions, and online communities.'] ] }
];

const SCENARIO_DATA = window.AI_NEWS_SCENARIO_DATA;
if (!SCENARIO_DATA || !Array.isArray(SCENARIO_DATA.scenarios) || !SCENARIO_DATA.scenarios.length) {
  throw new Error('Scenario data is missing or invalid.');
}
const STORY_POOL = SCENARIO_DATA.scenarios;
const ROUND_EVENT_DATA = window.AI_NEWS_ROUND_EVENT_DATA;
if (!ROUND_EVENT_DATA || !Array.isArray(ROUND_EVENT_DATA.schedule) || !Array.isArray(ROUND_EVENT_DATA.events)) {
  throw new Error('Round-event data is missing or invalid.');
}
const RESOURCE_RULES = window.AI_NEWS_RESOURCE_RULES;
if (!RESOURCE_RULES || !RESOURCE_RULES.assignmentCosts || !RESOURCE_RULES.defaultLimits) {
  throw new Error('Resource-rule data is missing or invalid.');
}

const TOPICS = { local: 'Local life', climate: 'Climate', government: 'Government', health: 'Public health', schools: 'Schools' };
const CHOICES = [['human', 'Human'], ['ai', 'AI'], ['verified', 'Human + AI', 'Verified automation']];
const BASE_EFFECTS = { human: { reach: 1, trust: 3 }, ai: { reach: 3, trust: 1 }, verified: { reach: 2, trust: 2 } };
const TASK_EXPLAINERS = {
  'Research & Source Discovery': {
    human: 'A journalist finds background, documents, experts, and sources.',
    ai: 'AI identifies background, documents, experts, and sources automatically.',
    verified: 'AI identifies possible material, and a journalist reviews and selects the sources.'
  },
  'Interview Processing': {
    human: 'A journalist conducts, transcribes, summarizes, and organizes the interviews.',
    ai: 'AI transcribes, summarizes, and organizes the interview material automatically.',
    verified: 'AI processes the interviews, and a journalist checks the transcript and summary.'
  },
  'Document Review': {
    human: 'A journalist reads the documents and identifies relevant evidence.',
    ai: 'AI reviews the documents and extracts relevant evidence automatically.',
    verified: 'AI extracts possible evidence, and a journalist checks it against the documents.'
  },
  'Data Gathering & Analysis': {
    human: 'A journalist gathers the data and analyzes it for patterns and insights.',
    ai: 'AI gathers, organizes, and analyzes the data automatically.',
    verified: 'AI analyzes the data, and a journalist reviews the methods and findings.'
  },
  'News Writing': {
    human: 'A journalist writes the story from the gathered information.',
    ai: 'AI drafts the story automatically from the gathered information.',
    verified: 'AI produces a draft, and a journalist reviews and revises it.'
  },
  'Editorial Planning': {
    human: 'Editors set priorities and decide how newsroom resources are allocated.',
    ai: 'AI recommends priorities and resource allocations automatically.',
    verified: 'AI recommends a plan, and editors review and approve the priorities.'
  },
  'Story Editing': {
    human: 'An editor revises the story for clarity, structure, and readability.',
    ai: 'AI revises the story for clarity, structure, and readability automatically.',
    verified: 'AI suggests revisions, and an editor decides which changes to make.'
  },
  'Fact Checking': {
    human: 'A journalist verifies the claims and evidence against original sources.',
    ai: 'AI checks claims and evidence automatically against available sources.',
    verified: 'AI flags claims and evidence, and a journalist verifies them against original sources.'
  },
  'Bias & Fairness Review': {
    human: 'An editor assesses the framing, balance, and missing perspectives.',
    ai: 'AI identifies possible bias, imbalance, and missing perspectives automatically.',
    verified: 'AI flags possible concerns, and an editor makes the fairness judgment.'
  },
  'Content Selection': {
    human: 'Editors decide what is published, promoted, and given prominence.',
    ai: 'AI selects what is published, promoted, and given prominence automatically.',
    verified: 'AI recommends what to feature, and editors make the final selection.'
  },
  'Headline Writing': {
    human: 'A journalist writes the titles and subheads.',
    ai: 'AI generates the titles and subheads automatically.',
    verified: 'AI generates options, and a journalist selects and revises the final wording.'
  },
  'Story Summarization': {
    human: 'A journalist writes the previews, abstracts, and key takeaways.',
    ai: 'AI produces previews, abstracts, and key takeaways automatically.',
    verified: 'AI produces a summary, and a journalist checks its emphasis and accuracy.'
  },
  'Visual Creation': {
    human: 'A journalist or designer creates the visuals for the story.',
    ai: 'AI generates the images, graphics, charts, or thumbnails automatically.',
    verified: 'AI generates visual options, and a journalist or designer reviews and refines them.'
  },
  'Format Adaptation': {
    human: 'A journalist adapts the story for each platform and format.',
    ai: 'AI adapts the story for different platforms and formats automatically.',
    verified: 'AI creates platform versions, and a journalist reviews each adaptation.'
  },
  'Story Promotion': {
    human: 'A journalist writes the teasers, captions, and push notifications.',
    ai: 'AI generates the promotional language automatically.',
    verified: 'AI generates promotional options, and a journalist selects and revises them.'
  },
  'Search Optimization': {
    human: 'A journalist improves the story’s search terms and discoverability.',
    ai: 'AI optimizes the story for search automatically.',
    verified: 'AI recommends search changes, and a journalist reviews them before publication.'
  },
  'Social Distribution': {
    human: 'A journalist publishes and adapts the story for social platforms.',
    ai: 'AI publishes and adapts the story across social platforms automatically.',
    verified: 'AI prepares social posts, and a journalist reviews them before distribution.'
  },
  'Audience Targeting': {
    human: 'A journalist decides which audiences should receive the story.',
    ai: 'AI selects and targets audiences automatically.',
    verified: 'AI recommends audience segments, and a journalist approves the targeting.'
  },
  'Performance Analysis': {
    human: 'A journalist monitors engagement and interprets audience behavior.',
    ai: 'AI monitors engagement and analyzes audience behavior automatically.',
    verified: 'AI identifies performance patterns, and a journalist interprets what they mean.'
  },
  'Community Management': {
    human: 'A journalist manages comments, interactions, and community relationships.',
    ai: 'AI moderates comments and manages audience interactions automatically.',
    verified: 'AI handles routine interactions, and a journalist reviews decisions and sensitive exchanges.'
  }
};
const TOTAL_TASKS = DESKS.reduce((sum, desk) => sum + desk.tasks.length, 0);
const TASKS_PER_DAY = TOTAL_TASKS * 3;
const STORAGE_KEY = 'ai-news-game-save-v4';
const state = { day: 1, stories: [], activeId: 1, activeDesk: 0, nextId: 1, nextTemplate: 0, logs: [], dailyResults: [], repeatVisitors: 0, totalTraffic: 0, phase: 'assigning', animateStories: false };
const $ = selector => document.querySelector(selector);

function readSavedGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || saved.version !== 4 || !saved.state || !Array.isArray(saved.state.stories) || !Array.isArray(saved.state.dailyResults)) return null;
    return saved.state;
  } catch (error) {
    return null;
  }
}

function saveGame() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 4, state })); } catch (error) { /* The game remains playable when local storage is unavailable. */ }
}

function clearSavedGame() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* Nothing to clear. */ }
}

function focusReportTop(dialogSelector, titleSelector) {
  requestAnimationFrame(() => {
    const dialog = $(dialogSelector);
    const panel = dialog?.querySelector('.modal');
    if (panel) panel.scrollTop = 0;
    const title = $(titleSelector);
    if (title) title.focus({ preventScroll: true });
    if (panel) panel.scrollTop = 0;
  });
}

function makeAssignments() { return DESKS.map(desk => Array(desk.tasks.length).fill(null)); }
function makeStory() {
  const scenario = STORY_POOL[state.nextTemplate % STORY_POOL.length];
  state.nextTemplate++;
  return {
    id: state.nextId++,
    scenarioId: scenario.id,
    topic: scenario.topic,
    title: scenario.title,
    storyType: scenario.storyType,
    modifiers: scenario.modifiers || {},
    assignments: makeAssignments()
  };
}
function newDay() {
  state.phase = 'assigning';
  state.activeDesk = 0;
  state.animateStories = true;
  state.stories = [makeStory(), makeStory(), makeStory()];
  state.activeId = state.stories[0].id;
  addLog(`Day ${state.day} begins`, 'Three stories are ready for newsroom assignments.');
  render();
}
function reset() {
  clearSavedGame();
  Object.assign(state, { day: 1, stories: [], activeId: 1, activeDesk: 0, nextId: 1, nextTemplate: 0, logs: [], dailyResults: [], repeatVisitors: 0, totalTraffic: 0, phase: 'assigning', animateStories: false });
  newDay();
}
function activeStory() { return state.stories.find(story => story.id === state.activeId) || state.stories[0]; }
function flattened(story) { return story.assignments.reduce((all, desk) => all.concat(desk), []); }
function allDayAssignments() { return state.stories.reduce((all, story) => all.concat(flattened(story)), []); }
function addLog(title, detail, reportDay = null) { state.logs.unshift({ title, detail, reportDay }); state.logs = state.logs.slice(0, 10); }

function eventForDay(day) {
  const eventId = ROUND_EVENT_DATA.schedule[day - 1];
  return eventId ? ROUND_EVENT_DATA.events.find(event => event.id === eventId) || null : null;
}

function resourceUse(assignments = allDayAssignments()) {
  return assignments.reduce((used, choice) => {
    if (!choice) return used;
    const cost = RESOURCE_RULES.assignmentCosts[choice] || {};
    used.human += cost.human || 0;
    used.ai += cost.ai || 0;
    return used;
  }, { human: 0, ai: 0 });
}

function resourceLimitsForDay(day) {
  return RESOURCE_RULES.dayOverrides?.[day] || RESOURCE_RULES.defaultLimits;
}

function resourceConstraintMessages(day = state.day) {
  if (!RESOURCE_RULES.enabled) return [];
  const used = resourceUse();
  const limits = resourceLimitsForDay(day);
  return ['human', 'ai'].flatMap(resource => {
    const messages = [];
    const limit = limits[resource] || {};
    if (limit.min !== null && limit.min !== undefined && used[resource] < limit.min) {
      messages.push(`Use at least ${limit.min} ${resource.toUpperCase()} resource units.`);
    }
    if (limit.max !== null && limit.max !== undefined && used[resource] > limit.max) {
      messages.push(`Use no more than ${limit.max} ${resource.toUpperCase()} resource units.`);
    }
    return messages;
  });
}

function storyTypeFor(story) {
  return SCENARIO_DATA.storyTypes[story.storyType] || { label: 'General news', description: '', taskFit: {} };
}

function taskFit(story, taskName) {
  return Number(storyTypeFor(story).taskFit?.[taskName] || 0);
}

function taskEffect(story, taskName, choice) {
  const base = BASE_EFFECTS[choice];
  const fit = taskFit(story, taskName);
  let reach = base.reach;
  let trust = base.trust;
  if (choice === 'ai') {
    if (fit === 2) { reach++; trust++; }
    else if (fit === 1) reach++;
    else if (fit === -1) trust--;
    else if (fit === -2) trust -= 2;
  } else if (choice === 'verified') {
    if (fit === 2) { reach++; trust++; }
    else if (fit === 1) reach++;
    else if (fit === -2) trust--;
  }
  return { reach: Math.max(0, reach), trust: Math.max(0, trust), fit };
}

function storyImpact(story) {
  let reachPoints = 0;
  let trustPoints = 0;
  let maxReachPoints = 0;
  let maxTrustPoints = 0;
  let assigned = 0;
  DESKS.forEach((desk, deskIndex) => desk.tasks.forEach(([taskName], taskIndex) => {
    const effects = Object.keys(BASE_EFFECTS).map(choice => taskEffect(story, taskName, choice));
    maxReachPoints += Math.max(...effects.map(effect => effect.reach));
    maxTrustPoints += Math.max(...effects.map(effect => effect.trust));
    const choice = story.assignments[deskIndex][taskIndex];
    if (!choice) return;
    assigned++;
    const effect = taskEffect(story, taskName, choice);
    reachPoints += effect.reach;
    trustPoints += effect.trust;
  }));
  return {
    assigned,
    reach: Math.round(reachPoints / maxReachPoints * 100),
    trust: Math.round(trustPoints / maxTrustPoints * 100)
  };
}

function assign(storyId, deskIndex, taskIndex, choice) {
  const story = state.stories.find(item => item.id === storyId);
  if (!story || !CHOICES.some(item => item[0] === choice)) return;
  story.assignments[deskIndex][taskIndex] = choice;
  render();
}

function assignDesk(storyId, deskIndex, choice) {
  const story = state.stories.find(item => item.id === storyId);
  if (!story || !CHOICES.some(item => item[0] === choice)) return;
  story.assignments[deskIndex] = story.assignments[deskIndex].map(() => choice);
  render();
}

function calculateDay() {
  const allocations = { human: 0, ai: 0, verified: 0 };
  let reachPoints = 0;
  let trustPoints = 0;
  let maxReachPoints = 0;
  let maxTrustPoints = 0;
  const driverStats = { fitUses: 0, reachBonus: 0, trustBonus: 0, riskyAI: 0, trustPenalty: 0, oversightUses: 0 };
  const storyEffects = [];
  state.stories.forEach(story => {
    const storyEffect = {
      title: story.title,
      storyType: story.storyType,
      typeLabel: storyTypeFor(story).label,
      bonusAssignments: 0,
      penaltyAssignments: 0,
      reachBonus: 0,
      trustBonus: 0,
      trustPenalty: 0,
      bonusDetails: [],
      penaltyDetails: []
    };
    DESKS.forEach((desk, deskIndex) => desk.tasks.forEach(([taskName], taskIndex) => {
      const choice = story.assignments[deskIndex][taskIndex];
      allocations[choice]++;
      const effect = taskEffect(story, taskName, choice);
      reachPoints += effect.reach;
      trustPoints += effect.trust;
      maxReachPoints += Math.max(...Object.keys(BASE_EFFECTS).map(key => taskEffect(story, taskName, key).reach));
      maxTrustPoints += Math.max(...Object.keys(BASE_EFFECTS).map(key => taskEffect(story, taskName, key).trust));
      if (choice !== 'human' && effect.fit > 0) {
        driverStats.fitUses++;
        driverStats.reachBonus += effect.reach - BASE_EFFECTS[choice].reach;
        driverStats.trustBonus += effect.trust - BASE_EFFECTS[choice].trust;
      }
      if (choice !== 'human') {
        const reachDelta = effect.reach - BASE_EFFECTS[choice].reach;
        const trustDelta = effect.trust - BASE_EFFECTS[choice].trust;
        if (reachDelta > 0 || trustDelta > 0) storyEffect.bonusAssignments++;
        if (trustDelta < 0) storyEffect.penaltyAssignments++;
        storyEffect.reachBonus += Math.max(0, reachDelta);
        storyEffect.trustBonus += Math.max(0, trustDelta);
        storyEffect.trustPenalty += Math.max(0, -trustDelta);
        if (reachDelta > 0 || trustDelta > 0) storyEffect.bonusDetails.push({ taskName, choice, reach: Math.max(0, reachDelta), trust: Math.max(0, trustDelta) });
        if (trustDelta < 0) storyEffect.penaltyDetails.push({ taskName, choice, trust: Math.max(0, -trustDelta) });
      }
      if (choice === 'ai' && effect.fit < 0) {
        driverStats.riskyAI++;
        driverStats.trustPenalty += BASE_EFFECTS.ai.trust - effect.trust;
      }
      if (choice === 'verified' && effect.fit < 0) driverStats.oversightUses++;
    }));
    storyEffects.push(storyEffect);
  });
  const roundEvent = eventForDay(state.day);
  if (roundEvent) {
    Object.entries(allocations).forEach(([choice, count]) => {
      const modifier = roundEvent.choiceModifiers?.[choice] || {};
      reachPoints += count * (modifier.reach || 0);
      trustPoints += count * (modifier.trust || 0);
    });
  }
  const reach = Math.max(0, Math.min(100, Math.round(reachPoints / maxReachPoints * 100)));
  const trust = Math.max(0, Math.min(100, Math.round(trustPoints / maxTrustPoints * 100)));
  const traffic = Math.round(6 + reach * .24);
  const repeat = Math.min(traffic, Math.round(traffic * trust / 125));
  const oneTime = traffic - repeat;
  return { day: state.day, allocations, reach, trust, traffic, repeat, oneTime, roundEvent, reachPoints, trustPoints, maxReachPoints, maxTrustPoints, driverStats, storyEffects };
}

function finishDay() {
  if (state.phase !== 'assigning' || allDayAssignments().some(choice => !choice)) return;
  const result = calculateDay();
  state.dailyResults.push(result);
  state.totalTraffic += result.traffic;
  state.repeatVisitors += result.repeat;
  state.phase = 'day-summary';
  addLog(`Day ${result.day} report`, `${result.traffic} traffic · ${result.repeat} repeat visitors`, result.day);
  saveGame();
  showDaySummary(result);
}

function countUp(element, target, duration = 700) {
  if (!element) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = target;
    return;
  }
  const start = performance.now();
  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function animateSummary(container) {
  container.querySelectorAll('[data-count]').forEach((element, index) => {
    element.textContent = '0';
    setTimeout(() => countUp(element, Number(element.dataset.count)), index * 85);
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    container.querySelectorAll('[data-width]').forEach(element => { element.style.width = `${element.dataset.width}%`; });
  }));
}

function audienceDots(result) {
  const total = Math.max(1, result.traffic);
  return Array.from({ length: total }, (_, index) => {
    const type = index < result.oneTime ? 'one-time' : 'repeat';
    return `<span class="audience-dot ${type}" style="animation-delay:${380 + index * 35}ms" aria-hidden="true"></span>`;
  }).join('');
}

function editorialSummary(allocations) {
  const labels = { human: 'Human', ai: 'AI', verified: 'Human + AI' };
  const ranked = Object.entries(allocations).sort((a, b) => b[1] - a[1]);
  const [top, second] = ranked;
  const total = ranked.reduce((sum, item) => sum + item[1], 0);
  if (top[1] === total) return `You assigned <strong>every task</strong> to <strong>${labels[top[0]]}</strong>.`;
  if (top[1] === second[1]) return 'You distributed tasks <strong>evenly</strong> rather than relying on one assignment type.';
  if (top[1] > total / 2) return `You assigned <strong>most tasks</strong> to <strong>${labels[top[0]]}</strong>: ${top[1]} of ${total} assignments.`;
  return `<strong>${labels[top[0]]}</strong> was your most common assignment, but your day used a <strong>mixed editorial strategy</strong>.`;
}

function choiceImpactSummary(allocations) {
  const ranked = Object.entries(allocations).sort((a, b) => b[1] - a[1]);
  if (ranked[0][1] === ranked[1][1]) return 'Your mix of <strong>Human</strong>, <strong>AI</strong>, and <strong>Human + AI</strong> assignments <strong>balanced reach and trust</strong>.';
  if (ranked[0][0] === 'human') return 'More <strong>Human</strong> assignments <strong>increased</strong> <strong>trust</strong> but <strong>lowered</strong> <strong>reach</strong>: your newsroom used less automation and was not as productive with each story.';
  if (ranked[0][0] === 'ai') return 'More <strong>AI</strong> assignments <strong>increased</strong> <strong>reach</strong> but <strong>lowered</strong> <strong>trust</strong>: your newsroom produced more, but fewer tasks received human judgment or verification.';
  return 'More <strong>Human + AI</strong> assignments <strong>balanced reach and trust</strong> by combining automation with human verification.';
}

function impactDriverSummary(result) {
  const stats = result.driverStats || {};
  const drivers = [];
  if (stats.fitUses) {
    const gains = [stats.reachBonus ? `<strong>+${stats.reachBonus} reach</strong>` : '', stats.trustBonus ? `<strong>+${stats.trustBonus} trust</strong>` : ''].filter(Boolean).join(' and ');
    drivers.push(`<strong>${stats.fitUses} AI-assisted assignments</strong> matched their story type${gains ? `, adding ${gains}` : ''}.`);
  }
  if (stats.riskyAI) drivers.push(`<strong>${stats.riskyAI} AI-only assignments</strong> were caution or high-stakes uses, costing <strong>${stats.trustPenalty} trust</strong>.`);
  if (stats.oversightUses) drivers.push(`Human oversight limited the trust penalty in <strong>${stats.oversightUses} risk-sensitive assignments</strong>.`);
  if (!drivers.length) drivers.push('Your story-specific choices were mostly neutral, so the basic reach–trust tradeoff drove the result.');
  return `<div class="driver-box"><strong>What drove this</strong><ul>${drivers.slice(0, 2).map(item => `<li>${item}</li>`).join('')}</ul></div>`;
}

function storyEffectsSummary(result) {
  const effects = Array.isArray(result.storyEffects) ? result.storyEffects : [];
  if (!effects.length) return '';
  return `<div class="story-effects"><strong>Story-type adjustments</strong>${effects.map(effect => {
    const bonuses = effect.reachBonus || effect.trustBonus
      ? `<span class="effect-positive">Bonus: ${effect.reachBonus ? `+${effect.reachBonus} reach` : ''}${effect.reachBonus && effect.trustBonus ? ' · ' : ''}${effect.trustBonus ? `+${effect.trustBonus} trust` : ''}</span>`
      : '<span class="effect-neutral">No AI-use bonus</span>';
    const penalty = effect.trustPenalty
      ? `<span class="effect-negative">Penalty: −${effect.trustPenalty} trust</span>`
      : '<span class="effect-neutral">No AI-use penalty</span>';
    return `<div class="story-effect-row"><div class="story-effect-heading"><b>${effect.title}</b><small>${effect.typeLabel}</small></div><div class="story-effect-explanation"><div class="effect-totals">${bonuses}${penalty}</div>${effectReasonList(effect)}</div></div>`;
  }).join('')}</div>`;
}

function formatTaskList(tasks) {
  if (tasks.length <= 1) return tasks[0] || '';
  if (tasks.length === 2) return `${tasks[0]} and ${tasks[1]}`;
  return `${tasks.slice(0, -1).join(', ')}, and ${tasks.at(-1)}`;
}

function groupedEffectDetails(details, kind) {
  const groups = new Map();
  (Array.isArray(details) ? details : []).forEach(detail => {
    const key = kind === 'bonus'
      ? `${detail.choice}|${detail.reach || 0}|${detail.trust || 0}`
      : `${detail.choice}|${detail.trust || 0}`;
    if (!groups.has(key)) groups.set(key, { ...detail, tasks: [] });
    groups.get(key).tasks.push(detail.taskName);
  });
  return [...groups.values()];
}

function effectReasonList(effect) {
  const choiceLabels = { ai: 'AI', verified: 'Human + AI' };
  const bonusLines = groupedEffectDetails(effect.bonusDetails, 'bonus').map(group => {
    const gains = [group.reach ? `+${group.reach * group.tasks.length} reach` : '', group.trust ? `+${group.trust * group.tasks.length} trust` : ''].filter(Boolean).join(' and ');
    return `Using <strong>${choiceLabels[group.choice]}</strong> for <strong>${formatTaskList(group.tasks)}</strong> matched this ${effect.typeLabel.toLowerCase()} story and added <strong>${gains}</strong>.`;
  });
  const penaltyLines = groupedEffectDetails(effect.penaltyDetails, 'penalty').map(group => `Using <strong>${choiceLabels[group.choice]}</strong> for <strong>${formatTaskList(group.tasks)}</strong> was risk-sensitive for this ${effect.typeLabel.toLowerCase()} story and cost <strong>−${group.trust * group.tasks.length} trust</strong>.`);
  const lines = [...bonusLines.map(text => ({ type: 'bonus', text })), ...penaltyLines.map(text => ({ type: 'penalty', text }))];
  if (!lines.length) return '<p class="effect-neutral effect-reason-empty">Your AI-assisted assignments received no story-type bonus or penalty.</p>';
  return `<ul class="effect-reasons">${lines.map(line => `<li class="${line.type}">${line.text}</li>`).join('')}</ul>`;
}

function finalStoryEffectsSummary(days) {
  const rows = days.map(day => {
    const effects = Array.isArray(day.storyEffects) ? day.storyEffects : [];
    return effects.reduce((sum, effect) => {
      sum.reachBonus += effect.reachBonus || 0;
      sum.trustBonus += effect.trustBonus || 0;
      sum.trustPenalty += effect.trustPenalty || 0;
      return sum;
    }, { day: day.day, reachBonus: 0, trustBonus: 0, trustPenalty: 0, effects });
  });
  const total = rows.reduce((sum, row) => {
    sum.reachBonus += row.reachBonus;
    sum.trustBonus += row.trustBonus;
    sum.trustPenalty += row.trustPenalty;
    return sum;
  }, { reachBonus: 0, trustBonus: 0, trustPenalty: 0 });
  return `<div class="effect-rollup">${rows.map(row => `<div><strong>Day ${row.day}</strong><span class="effect-positive">+${row.reachBonus} reach · +${row.trustBonus} trust</span><span class="effect-negative">−${row.trustPenalty} trust</span><details><summary>What caused this?</summary>${row.effects.map(effect => `<div class="rollup-story"><b>${effect.title}</b>${effectReasonList(effect)}</div>`).join('')}</details></div>`).join('')}</div><p class="report-explanation">Across three days, story-type fit added <strong>+${total.reachBonus} reach</strong> and <strong>+${total.trustBonus} trust</strong>, while risk-sensitive AI use cost <strong>−${total.trustPenalty} trust</strong>.</p>`;
}

function readershipSummary(result) {
  const reachBand = result.reach >= 70 ? 'high' : result.reach >= 45 ? 'medium' : 'low';
  const retentionRate = result.traffic ? result.repeat / result.traffic : 0;
  const retention = retentionRate >= .7 ? 'most' : retentionRate >= .4 ? 'some' : 'few';
  const reachPositive = reachBand === 'high';
  const retentionPositive = retention === 'most';
  const conjunction = reachPositive === retentionPositive ? 'and' : 'but';
  return `This level of reach gave you a <strong>${reachBand} volume of readers</strong>, ${conjunction} this level of trust <strong>helped you retain ${retention} of them</strong>.`;
}

function finalReadershipSummary(days) {
  const first = days[0];
  const last = days[days.length - 1];
  const trafficChange = last.traffic - first.traffic;
  const direction = trafficChange >= 3 ? 'grew' : trafficChange <= -3 ? 'fell' : 'remained fairly steady';
  const bestTraffic = days.reduce((best, day) => day.traffic > best.traffic ? day : best, days[0]);
  const bestRetention = days.reduce((best, day) => (day.repeat / day.traffic) > (best.repeat / best.traffic) ? day : best, days[0]);
  return `Traffic <strong>${direction}</strong> from Day 1 to Day 3. <strong>Day ${bestTraffic.day}</strong> brought in the most readers, while <strong>Day ${bestRetention.day}</strong> retained the largest share of its audience.`;
}

let logicTimers = [];
function playLogicAnimation() {
  const animation = $('#logic-animation');
  if (!animation) return;
  logicTimers.forEach(timer => clearTimeout(timer));
  logicTimers = [];
  const steps = [...animation.querySelectorAll('.logic-step')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  animation.classList.add('sequencing');
  steps.forEach(step => {
    step.classList.remove('visible', 'active');
    step.querySelectorAll('[data-logic-count]').forEach(value => { value.textContent = '0'; });
  });
  if (reducedMotion) {
    steps.forEach(step => {
      step.classList.add('visible');
      step.querySelectorAll('[data-logic-count]').forEach(value => { value.textContent = value.dataset.logicCount; });
    });
    return;
  }
  steps.forEach((step, index) => {
    logicTimers.push(setTimeout(() => {
      steps.forEach(item => item.classList.remove('active'));
      step.classList.add('visible', 'active');
      step.querySelectorAll('[data-logic-count]').forEach(value => countUp(value, Number(value.dataset.logicCount), 550));
    }, index * 950));
  });
  logicTimers.push(setTimeout(() => steps.forEach(step => step.classList.remove('active')), steps.length * 950));
}

function showDaySummary(result, review = false) {
  $('#day-summary-kicker').textContent = `Day ${result.day} complete`;
  $('#day-summary-grid').innerHTML = `
    <div class="metric" style="animation-delay:0ms"><span>Human</span><strong data-count="${result.allocations.human}">0</strong></div>
    <div class="metric" style="animation-delay:70ms"><span>AI</span><strong data-count="${result.allocations.ai}">0</strong></div>
    <div class="metric" style="animation-delay:140ms"><span>Human + AI</span><strong data-count="${result.allocations.verified}">0</strong></div>`;
  $('#editorial-summary').innerHTML = editorialSummary(result.allocations);
  $('#choice-impact-summary').innerHTML = impactDriverSummary(result);
  $('#day-impact-container').innerHTML = `${storyEffectsSummary(result)}<div class="impact-viz" id="day-impact-viz">
    <div class="impact-meter"><span>Reach</span><div class="impact-track"><div class="impact-fill reach" data-width="${result.reach}"></div></div><strong data-count="${result.reach}">0</strong></div>
    <div class="impact-meter"><span>Trust</span><div class="impact-track"><div class="impact-fill trust" data-width="${result.trust}"></div></div><strong data-count="${result.trust}">0</strong></div>
    <div class="audience-flow">
      <div class="audience-source"><span class="tiny">Traffic</span><strong data-count="${result.traffic}">0</strong><div class="audience-dots">${audienceDots(result)}</div></div>
      <div class="flow-arrow" aria-hidden="true">→</div>
      <div class="audience-outcomes"><div><span class="tiny">One-time</span><strong data-count="${result.oneTime}">0</strong></div><div><span class="tiny">Repeat</span><strong data-count="${result.repeat}">0</strong></div></div>
    </div>
  </div>`;
  $('#readership-summary').innerHTML = readershipSummary(result);
  $('#next-day').dataset.mode = review ? 'close' : 'advance';
  $('#next-day').textContent = review ? `Close Day ${result.day} report` : state.day < 3 ? `Begin Day ${state.day + 1}` : 'View three-day summary';
  $('#day-summary').classList.remove('hidden');
  animateSummary($('#day-summary'));
  focusReportTop('#day-summary', '#day-summary-title');
}

function showFinalSummary() {
  state.phase = 'final';
  const subscribers = Math.floor(state.repeatVisitors / 3);
  const remainingRepeat = state.repeatVisitors % 3;
  const oneTimeVisitors = state.dailyResults.reduce((sum, day) => sum + day.oneTime, 0);
  const audienceTotal = Math.max(1, oneTimeVisitors + remainingRepeat + subscribers);
  const finalScore = state.totalTraffic + remainingRepeat * 2 + subscribers * 6;
  const averageReach = Math.round(state.dailyResults.reduce((sum, day) => sum + day.reach, 0) / state.dailyResults.length);
  const averageTrust = Math.round(state.dailyResults.reduce((sum, day) => sum + day.trust, 0) / state.dailyResults.length);
  const totals = state.dailyResults.reduce((sum, day) => {
    sum.human += day.allocations.human; sum.ai += day.allocations.ai; sum.verified += day.allocations.verified; return sum;
  }, { human: 0, ai: 0, verified: 0 });
  $('#final-allocation-grid').innerHTML = `
    <div class="metric" style="animation-delay:0ms"><span>Human assignments</span><strong data-count="${totals.human}">0</strong></div>
    <div class="metric" style="animation-delay:70ms"><span>AI assignments</span><strong data-count="${totals.ai}">0</strong></div>
    <div class="metric" style="animation-delay:140ms"><span>Human + AI</span><strong data-count="${totals.verified}">0</strong></div>`;
  $('#final-editorial-summary').innerHTML = editorialSummary(totals);
  $('#final-story-effects').innerHTML = finalStoryEffectsSummary(state.dailyResults);
  $('#final-day-bars-container').innerHTML = `<div class="day-bars" id="final-day-bars">${state.dailyResults.map(day => {
    const oneTimeWidth = day.oneTime / day.traffic * 100;
    const repeatWidth = day.repeat / day.traffic * 100;
    return `<div class="day-bar"><span>Day ${day.day}</span><div class="day-bar-track"><span class="one-time" data-width="${oneTimeWidth}"></span><span class="repeat" data-width="${repeatWidth}"></span></div><small>${day.traffic} visits</small></div>`;
  }).join('')}</div>`;
  $('#final-readership-summary').innerHTML = finalReadershipSummary(state.dailyResults);
  $('#logic-animation').innerHTML = `
    <div class="logic-step"><span class="logic-number">1</span><div class="logic-copy"><strong>You allocated newsroom work</strong><p>Every task assigned to Human, AI, or Human + AI contributed to the day’s tradeoff.</p><div class="logic-values"><span><b data-logic-count="${totals.human}">${totals.human}</b> Human</span><span><b data-logic-count="${totals.ai}">${totals.ai}</b> AI</span><span><b data-logic-count="${totals.verified}">${totals.verified}</b> Human + AI</span></div></div></div>
    <div class="logic-step"><span class="logic-number">2</span><div class="logic-copy"><strong>Story type changed the tradeoff</strong><p>AI fit some tasks better than others; human oversight reduced risk in high-stakes uses.</p><div class="logic-values"><span><b data-logic-count="${averageReach}">${averageReach}</b> average reach</span><span><b data-logic-count="${averageTrust}">${averageTrust}</b> average trust</span></div></div></div>
    <div class="logic-step"><span class="logic-number">3</span><div class="logic-copy"><strong>Reach attracted readers; trust kept them</strong><p>Reach generated traffic. Trust determined how much of that audience returned.</p><div class="logic-values"><span><b data-logic-count="${state.totalTraffic}">${state.totalTraffic}</b> total traffic</span><span><b data-logic-count="${oneTimeVisitors}">${oneTimeVisitors}</b> one-time</span><span><b data-logic-count="${state.repeatVisitors}">${state.repeatVisitors}</b> repeat</span></div></div></div>
    <div class="logic-step"><span class="logic-number">4</span><div class="logic-copy"><strong>Retention created subscribers and score</strong><p>Every three repeat visitors became one subscriber. Traffic and retained audience then contributed to the final score.</p><div class="logic-values"><span><b data-logic-count="${subscribers}">${subscribers}</b> subscribers</span><span><b data-logic-count="${remainingRepeat}">${remainingRepeat}</b> repeat left</span><span><b data-logic-count="${finalScore}">${finalScore}</b> final score</span></div></div></div>`;
  $('#final-audience-breakdown').innerHTML = `<div class="audience-breakdown" aria-label="Final audience breakdown">
    <div class="audience-breakdown-cards">
      <div class="audience-category unique"><span><i class="swatch" aria-hidden="true"></i>One-time visitors</span><strong data-count="${oneTimeVisitors}">0</strong></div>
      <div class="audience-category repeat"><span><i class="swatch" aria-hidden="true"></i>Repeat visitors</span><strong data-count="${remainingRepeat}">0</strong></div>
      <div class="audience-category subscriber"><span><i class="swatch" aria-hidden="true"></i>Subscribers</span><strong data-count="${subscribers}">0</strong></div>
    </div>
    <div class="audience-stack" aria-hidden="true">
      <span class="unique" data-width="${oneTimeVisitors / audienceTotal * 100}"></span>
      <span class="repeat" data-width="${remainingRepeat / audienceTotal * 100}"></span>
      <span class="subscriber" data-width="${subscribers / audienceTotal * 100}"></span>
    </div>
  </div>`;
  $('#result-grid').innerHTML = `
    <div class="metric" style="animation-delay:0ms"><span>Total traffic</span><strong data-count="${state.totalTraffic}">0</strong></div>
    <div class="metric" style="animation-delay:70ms"><span>Repeat visitors left</span><strong data-count="${remainingRepeat}">0</strong></div>
    <div class="metric" style="animation-delay:140ms"><span>Subscribers</span><strong data-count="${subscribers}">0</strong></div>
    <div class="metric" style="animation-delay:210ms"><span>Final score</span><strong data-count="${finalScore}">0</strong></div>`;
  $('#reflection').innerHTML = `Across the three days, <strong>${oneTimeVisitors} one-time visitors</strong> did not return and you retained <strong>${state.repeatVisitors} repeat visits</strong>. Every three repeat visits became one subscriber, producing <strong>${subscribers} subscribers</strong> and leaving <strong>${remainingRepeat} repeat visits</strong>. Your <strong>final score was ${finalScore}</strong>: traffic + (2 × remaining repeat visits) + (6 × subscribers).`;
  $('#results').classList.remove('hidden');
  animateSummary($('#results'));
  playLogicAnimation();
  focusReportTop('#results', '#results-title');
  saveGame();
}

function render() {
  const story = activeStory();
  const storyAssignments = flattened(story);
  const storyAssigned = storyAssignments.filter(Boolean).length;
  const dayAssignments = allDayAssignments();
  const dayAssigned = dayAssignments.filter(Boolean).length;
  const counts = { human: 0, ai: 0, verified: 0 };
  dayAssignments.forEach(choice => { if (choice) counts[choice]++; });
  $('#day').textContent = `${state.day}/3`;
  $('#assigned').textContent = `${dayAssigned}/${TASKS_PER_DAY}`;
  const headerSubscribers = Math.floor(state.repeatVisitors / 3);
  const headerRepeatVisitors = state.repeatVisitors % 3;
  const headerOneTimeVisitors = state.dailyResults.reduce((sum, result) => sum + result.oneTime, 0);
  $('#one-time-header').textContent = headerOneTimeVisitors;
  $('#repeat-header').textContent = headerRepeatVisitors;
  $('#subscriber-header').textContent = headerSubscribers;
  $('#human-count').textContent = counts.human;
  $('#ai-count').textContent = counts.ai;
  $('#collab-count').textContent = counts.verified;

  const animateStories = Boolean(state.animateStories);
  const storyList = `<div class="story-tabs" role="tablist" aria-label="Day ${state.day} stories">${state.stories.map((item, storyIndex) => {
    const progress = flattened(item).filter(Boolean).length;
    const complete = progress === TOTAL_TASKS;
    const type = storyTypeFor(item);
    return `<button type="button" role="tab" aria-selected="${item.id === story.id}" class="story-tab ${complete ? 'complete' : 'incomplete'} ${item.id === story.id ? 'active' : ''} ${animateStories ? 'story-enter' : ''}" ${animateStories ? `style="animation-delay:${storyIndex * 150}ms"` : ''} data-action="select-story" data-story="${item.id}"><span class="story-tab-labels"><b>${TOPICS[item.topic]}</b><i>${type.label}</i></span><strong>${item.title}</strong><span class="story-tab-description">${type.description}</span><span class="story-tab-progress">${progress}/${TOTAL_TASKS} assigned</span><span class="story-tab-status">${complete ? '✓ COMPLETE' : `TO DO · ${TOTAL_TASKS - progress} LEFT`}</span></button>`;
  }).join('')}</div>`;

  const activeDeskIndex = Number.isInteger(state.activeDesk) && state.activeDesk >= 0 && state.activeDesk < DESKS.length ? state.activeDesk : 0;
  const deskTabs = `<div class="desk-tabs" role="tablist" aria-label="Newsroom desks">${DESKS.map((desk, deskIndex) => {
    const progress = story.assignments[deskIndex].filter(Boolean).length;
    const complete = progress === desk.tasks.length;
    return `<button type="button" role="tab" aria-selected="${deskIndex === activeDeskIndex}" class="desk-tab ${deskIndex === activeDeskIndex ? 'active' : ''} ${complete ? 'complete' : 'incomplete'}" style="--desk:${desk.color}" data-action="select-desk" data-desk="${deskIndex}"><strong>${desk.name.replace(' Desk', '')}</strong><span class="desk-tab-status">${complete ? '✓ COMPLETE' : `TO DO · ${desk.tasks.length - progress} LEFT`}</span></button>`;
  }).join('')}</div>`;
  const desk = DESKS[activeDeskIndex];
  const bulk = CHOICES.map(([key, label]) => `<button type="button" data-action="assign-desk" data-story="${story.id}" data-desk="${activeDeskIndex}" data-choice="${key}">All ${label}</button>`).join('');
  const tasks = desk.tasks.map(([name, description], taskIndex) => {
    const selected = story.assignments[activeDeskIndex][taskIndex];
    const buttons = CHOICES.map(([key, label]) => `<button type="button" class="${selected === key ? 'selected' : ''}" aria-label="${label} for ${name}" aria-pressed="${selected === key}" data-action="assign" data-story="${story.id}" data-desk="${activeDeskIndex}" data-task="${taskIndex}" data-choice="${key}"><span>${label}</span></button>`).join('');
    const explainer = selected ? `<p class="task-choice-explainer"><b>${CHOICES.find(([key]) => key === selected)[1]}:</b> ${TASK_EXPLAINERS[name][selected]}</p>` : '';
    return `<div class="board-task"><div class="board-task-copy"><strong>${name}</strong> <span>${description}</span>${explainer}</div><div class="board-choices">${buttons}</div></div>`;
  }).join('');
  const deskPanel = `<section class="desk active-desk-panel" style="--desk:${desk.color}"><div class="desk-head"><div class="desk-head-title"><span>${activeDeskIndex + 1}</span><div><h3>${desk.name}</h3><p>${desk.subtitle}</p></div></div><div class="desk-head-bulk" aria-label="Assign all tasks at ${desk.name}"><small>Apply to all</small><div class="desk-bulk-choices">${bulk}</div></div></div>${tasks}<div class="desk-navigation"><button type="button" class="secondary" data-action="previous-desk" ${activeDeskIndex === 0 ? 'disabled' : ''}>Previous desk</button><button type="button" class="secondary" data-action="next-desk" ${activeDeskIndex === DESKS.length - 1 ? 'disabled' : ''}>Next desk</button></div></section>`;

  const remaining = TASKS_PER_DAY - dayAssigned;
  const impact = storyImpact(story);
  $('#stories').innerHTML = `<div class="story-workspace"><aside class="story-column"><h3 class="workspace-title">Your story leads</h3>${storyList}<div class="story-outlook" aria-label="Current story outlook: reach ${impact.reach}, trust ${impact.trust}"><strong>Story outlook</strong><div class="outlook-row"><span>Reach</span><i class="outlook-track"><i class="reach" style="width:${impact.reach}%"></i></i><b>${impact.reach}</b></div><div class="outlook-row"><span>Trust</span><i class="outlook-track"><i class="trust" style="width:${impact.trust}%"></i></i><b>${impact.trust}</b></div><small>Selected story · updates as you assign tasks</small></div></aside><article class="active-story" aria-label="Decisions for ${story.title}"><h3 class="workspace-title">Editorial decisions</h3>${deskTabs}<div class="news-board single-desk">${deskPanel}</div></article></div><div class="day-action"><strong>Day ${state.day} assignments</strong><p class="tiny">Complete all three story plans to see their combined audience impact.</p><button type="button" class="primary" data-action="finish-day" ${remaining ? 'disabled' : ''}>${remaining ? `${remaining} assignments remaining` : `Finish Day ${state.day}`}</button></div>`;
  state.animateStories = false;
  $('#log').innerHTML = state.logs.map(item => item.reportDay
    ? `<div class="log-item"><button type="button" class="log-button" data-report-day="${item.reportDay}"><strong>${item.title}</strong><span>${item.detail}</span></button></div>`
    : `<div class="log-item"><strong>${item.title}</strong><span>${item.detail}</span></div>`).join('');
  saveGame();
}

$('#stories').addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const storyId = Number(button.dataset.story);
  if (button.dataset.action === 'select-story') { state.activeId = storyId; state.activeDesk = 0; render(); }
  else if (button.dataset.action === 'select-desk') { state.activeDesk = Number(button.dataset.desk); render(); }
  else if (button.dataset.action === 'previous-desk') { state.activeDesk = Math.max(0, (state.activeDesk || 0) - 1); render(); }
  else if (button.dataset.action === 'next-desk') { state.activeDesk = Math.min(DESKS.length - 1, (state.activeDesk || 0) + 1); render(); }
  else if (button.dataset.action === 'assign') assign(storyId, Number(button.dataset.desk), Number(button.dataset.task), button.dataset.choice);
  else if (button.dataset.action === 'assign-desk') assignDesk(storyId, Number(button.dataset.desk), button.dataset.choice);
  else if (button.dataset.action === 'finish-day') finishDay();
});

$('#next-day').addEventListener('click', () => {
  $('#day-summary').classList.add('hidden');
  if ($('#next-day').dataset.mode === 'close') return;
  if (state.day < 3) { state.day++; newDay(); } else showFinalSummary();
});
$('#log').addEventListener('click', event => {
  const button = event.target.closest('[data-report-day]');
  if (!button) return;
  const result = state.dailyResults.find(day => day.day === Number(button.dataset.reportDay));
  if (result) showDaySummary(result, true);
});
$('#restart').addEventListener('click', () => { $('#results').classList.add('hidden'); reset(); });
$('#replay-logic').addEventListener('click', playLogicAnimation);
$('#start').addEventListener('click', () => { $('#intro').classList.add('hidden'); reset(); });

const savedGame = readSavedGame();
if (savedGame) $('#resume').classList.remove('hidden');

$('#resume').addEventListener('click', () => {
  const saved = readSavedGame();
  if (!saved) return;
  Object.assign(state, saved);
  $('#intro').classList.add('hidden');
  render();
  if (state.phase === 'day-summary' && state.dailyResults.length) showDaySummary(state.dailyResults[state.dailyResults.length - 1]);
  else if (state.phase === 'final' && state.dailyResults.length === 3) showFinalSummary();
});

let helpReturnFocus = null;
$('#open-help').addEventListener('click', () => {
  helpReturnFocus = document.activeElement;
  $('#help').classList.remove('hidden');
  focusReportTop('#help', '#help-title');
});
$('#close-help').addEventListener('click', () => {
  $('#help').classList.add('hidden');
  if (helpReturnFocus) helpReturnFocus.focus();
});
