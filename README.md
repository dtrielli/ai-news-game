# AI News Game

**Current build: Research Footer 1.5**

A barebones digital prototype of the AI News Game. It closely follows the current tabletop board: Reporting, Editing, Packaging, and Audience desks, each containing five tasks.

## Play locally

Open `index.html` in any modern browser. No installation, build step, account, or internet connection is required.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Add `index.html` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

GitHub will provide a public URL after the first deployment finishes.

## Current prototype

- Three untimed days with a summary after each day
- Three selectable stories per day, each with its own complete set of assignments
- Twenty tabletop tasks available simultaneously for each story
- Human, AI, and Human + AI (verified automation) assignments
- Desk-level controls for assigning all five tasks at once
- Choices can be revised until the day is completed
- Provisional readership effects: traffic, one-time visitors, repeat visitors, and subscribers
- Animated reach, trust, traffic, and retention summaries
- Rules-based explanations of editorial choices and readership effects
- Final report embeds rules-based explanations of strategy, readership change, retention, subscriber conversion, and scoring
- Day and final reports scroll within the viewport at standard browser zoom
- Key phrases in report explanations are emphasized for scanning

## Editing story scenarios

Story text is stored separately in `data/scenarios.js`. Each scenario has a stable ID, title, topic, story type, and optional scenario-level modifiers. Story types are defined in the same data file and include neutral placeholders for future AI-use bonuses and penalties.

The data file contains no gameplay or interface code, and it can be edited without changing `app.js`. It is JavaScript rather than fetched JSON so the downloaded game continues to work when `index.html` is opened directly from a computer.

## Editing round events

Global day-level conditions are stored in `data/round-events.js`. Each event can modify reach and trust for Human, AI, and Human + AI assignments across all three stories in that day. The three-item `schedule` determines which event applies to each day.

The included `ai_hype` and `ai_backlash` events are inactive and have neutral values. They establish the data structure without changing current gameplay. For example, a later version could use `schedule: ['ai_hype', null, 'ai_backlash']` and assign nonzero modifiers after the scoring rules have been decided.

## Editing resource constraints

Optional Human and AI resource limits are defined in `data/resource-rules.js`. They are disabled and unrestricted by default. Limits can set daily minimums and maximums, with optional overrides for individual days.

Resource use is calculated separately from assignment labels: Human uses one Human unit, AI uses one AI unit, and Human + AI uses one unit of each. The game code already includes functions for calculating use and identifying violations; a later interface can expose those limits to players when the rules are activated.
- Previous day reports can be reopened from the newsroom log
- Story tabs appear above and below the board with clear incomplete/complete status badges
- Final three-day score using the tabletop board's displayed scoring structure
- Three-column allocation summaries and an animated final breakdown of unique visitors, repeat visitors, and subscribers
- Replayable final animation explaining assignments → reach/trust → traffic/retention → subscribers/score
- Replay visibly dims, reveals, highlights, and counts up each explanatory step in sequence
- Authorship, copyright, UMD affiliation, funding, non-endorsement, contact, and no-data-collection notice
- Day and final reports reset to their headings instead of opening scrolled to the bottom
- Responsive layout and keyboard-accessible controls

## Important limitation

The numerical effects are placeholders for playtesting, not empirical claims about human or AI performance. The next design phase should test whether players can understand the consequences of their choices and whether the simulation supports the intended classroom discussion.
