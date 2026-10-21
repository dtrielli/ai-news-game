'use strict';

const CONTENT = window.AI_NEWS_CONTENT;
if (!CONTENT || !Array.isArray(CONTENT.stories) || !CONTENT.stories.length) {
  throw new Error('Shared story data is missing or invalid.');
}

const DESKS = [
  { name:'Reporting Desk', subtitle:'Gather information and produce stories.', color:'#07863f', tasks:[
    ['Research & Source Discovery','Find background, documents, experts, and sources.'],
    ['Interview Processing','Conduct, transcribe, summarize, and organize interviews.'],
    ['Document Review','Review reports, filings, studies, records, and primary documents.'],
    ['Data Gathering & Analysis','Collect, organize, and analyze data for patterns and insights.'],
    ['News Writing','Draft stories based on gathered information.'] ] },
  { name:'Editing Desk', subtitle:'Set priorities and strengthen accuracy.', color:'#1764c0', tasks:[
    ['Editorial Planning','Decide newsroom priorities and allocate coverage resources.'],
    ['Story Editing','Improve clarity, structure, and readability.'],
    ['Fact Checking','Verify claims and evidence.'],
    ['Bias & Fairness Review','Assess framing, balance, and missing perspectives.'],
    ['Content Selection','Decide what gets published, promoted, and given prominence.'] ] },
  { name:'Packaging Desk', subtitle:'Shape how stories appear.', color:'#fa6700', tasks:[
    ['Headline Writing','Create titles and subheads.'],
    ['Story Summarization','Produce previews, abstracts, and key takeaways.'],
    ['Visual Creation','Create images, graphics, charts, and thumbnails.'],
    ['Format Adaptation','Adapt content for newsletters, video, mobile, social, and more.'],
    ['Story Promotion','Create teasers, captions, and push notifications.'] ] },
  { name:'Audience Desk', subtitle:'Distribute stories and build relationships.', color:'#d60b71', tasks:[
    ['Search Optimization','Improve discoverability through search.'],
    ['Social Distribution','Publish and adapt content for social platforms.'],
    ['Audience Targeting','Decide which audiences receive content.'],
    ['Performance Analysis','Monitor engagement and audience behavior.'],
    ['Community Management','Manage comments, audience interactions, and online communities.'] ] }
];

const CHOICES = [
  ['human','Human'],
  ['ai','AI'],
  ['verified','Human + AI']
];
const STORAGE_KEY = 'ai-news-game-classroom-board-v1';
const $ = id => document.getElementById(id);
const state = {
  audience:'college', storyId:CONTENT.stories[0].id, playerName:'', activeDesk:0,
  assignments:Array.from({length:4},()=>Array(5).fill(null))
};

function save() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch {}
}

function load() {
  try {
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !['college','highSchool'].includes(saved.audience) || !CONTENT.stories.some(s=>s.id===saved.storyId)) return;
    if (!Array.isArray(saved.assignments) || saved.assignments.length!==4 || saved.assignments.some(row=>!Array.isArray(row)||row.length!==5||row.some(v=>v!==null&&!CHOICES.some(([key])=>key===v)))) return;
    state.audience=saved.audience; state.storyId=saved.storyId; state.playerName=String(saved.playerName||'');
    state.activeDesk=Number.isInteger(saved.activeDesk)&&saved.activeDesk>=0&&saved.activeDesk<4?saved.activeDesk:0;
    state.assignments=saved.assignments;
  } catch {}
}

function currentStory() { return CONTENT.stories.find(story=>story.id===state.storyId) || CONTENT.stories[0]; }
function currentVersion() { return currentStory().print[state.audience]; }
function flatAssignments() { return state.assignments.flat(); }

function renderStory() {
  const story=currentStory(), version=currentVersion();
  $('audience-version').value=state.audience;
  $('story-select').value=state.storyId;
  $('player-name').value=state.playerName;
  $('story-meta').textContent=`Story ${story.print.order} · ${story.topic.label} · ${state.audience==='college'?'College':'High school'}`;
  $('story-heading').textContent=story.title;
  $('story-background').textContent=version.background;
  $('story-expectation').textContent=version.expectation;
  $('story-focus').textContent=version.focus;
}

function renderTotals() {
  const values=flatAssignments();
  const human=values.filter(v=>v==='human').length;
  const ai=values.filter(v=>v==='ai').length;
  const verified=values.filter(v=>v==='verified').length;
  const complete=human+ai+verified;
  $('progress-count').textContent=`${complete} / 20`;
  $('human-only').textContent=human;
  $('ai-only').textContent=ai;
  $('human-ai').textContent=verified;
  $('tasks-human').textContent=`${human+verified} / 20`;
  $('tasks-ai').textContent=`${ai+verified} / 20`;
  const message=$('completion-message');
  message.textContent=complete===20?'Board complete. Give these totals to your facilitator.':'Make one choice for every task.';
  message.classList.toggle('complete',complete===20);
}

function renderBoard() {
  $('desk-tabs').innerHTML=DESKS.map((desk,index)=>{
    const completed=state.assignments[index].filter(Boolean).length;
    return `<button type="button" class="desk-tab ${index===state.activeDesk?'active':''}" style="--desk:${desk.color}" data-desk="${index}">${desk.name}<small>${completed} / 5 complete</small></button>`;
  }).join('');
  const desk=DESKS[state.activeDesk];
  $('desk-panel').innerHTML=`<section class="desk" style="--desk:${desk.color}"><div class="desk-head"><h3>${desk.name}</h3><p>${desk.subtitle}</p></div>${desk.tasks.map(([name,description],taskIndex)=>`<div class="task"><div class="task-copy"><h4>${name}</h4><p>${description}</p></div><div class="choices" role="group" aria-label="Choose assignment for ${name}">${CHOICES.map(([key,label])=>`<button type="button" class="choice ${state.assignments[state.activeDesk][taskIndex]===key?'selected':''}" data-task="${taskIndex}" data-choice="${key}" aria-pressed="${state.assignments[state.activeDesk][taskIndex]===key}">${label}</button>`).join('')}</div></div>`).join('')}</section>`;
  renderTotals();
}

function clearAssignments() {
  state.assignments=Array.from({length:4},()=>Array(5).fill(null));
  state.activeDesk=0;
}

function confirmChange() {
  return !flatAssignments().some(Boolean) || window.confirm('Change the story or guide version and clear your current choices?');
}

$('story-select').innerHTML=CONTENT.stories.map(story=>`<option value="${story.id}">${story.print.order}. ${story.title}</option>`).join('');
load();
renderStory();
renderBoard();

$('audience-version').addEventListener('change',event=>{
  if (!confirmChange()) { event.target.value=state.audience; return; }
  state.audience=event.target.value; clearAssignments(); renderStory(); renderBoard(); save();
});
$('story-select').addEventListener('change',event=>{
  if (!confirmChange()) { event.target.value=state.storyId; return; }
  state.storyId=event.target.value; clearAssignments(); renderStory(); renderBoard(); save();
});
$('player-name').addEventListener('input',event=>{ state.playerName=event.target.value; save(); });
$('desk-tabs').addEventListener('click',event=>{
  const button=event.target.closest('[data-desk]'); if(!button)return;
  state.activeDesk=Number(button.dataset.desk); renderBoard(); save();
});
$('desk-panel').addEventListener('click',event=>{
  const button=event.target.closest('[data-task][data-choice]'); if(!button)return;
  state.assignments[state.activeDesk][Number(button.dataset.task)]=button.dataset.choice;
  renderBoard(); save();
});
$('reset-board').addEventListener('click',()=>{
  if(flatAssignments().some(Boolean)&&!window.confirm('Clear all 20 choices?'))return;
  clearAssignments(); renderBoard(); save();
});
