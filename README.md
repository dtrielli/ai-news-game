# AI News Game

**Current build: Aligned Content 1.14**

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
- Twenty tabletop tasks per story, grouped into four compact desk tabs
- Human, AI, and Human + AI (verified automation) assignments
- Desk-level controls for assigning all five tasks at once
- Choices can be revised until the day is completed
- Provisional readership effects: traffic, one-time visitors, repeat visitors, and subscribers
- Story types that change the consequences of AI and Human + AI assignments for particular tasks
- A live story-level reach and trust outlook that collects the effects of every assignment
- One visible newsroom desk at a time, with compact desk tabs and completion counts
- Explicit TO DO and COMPLETE markings on every story and desk tab
- Task titles and definitions presented together on a single compact line
- A single information-rich story list beside the decision panel, with no repeated story header or bottom story tabs
- The selected story’s live reach and trust outlook placed directly beneath the story list
- Matching story and decision panels with aligned edges, padding, borders, and height
- The active desk fills the decision panel, with navigation and Story outlook anchored to the shared bottom edge
- Desk-wide assignment controls placed in the colored desk header and aligned with the task-choice columns
- No per-choice fit markers; players infer priorities from the story-type stakes and observe consequences in the Story outlook
- Rules-based day reports that surface only the two strongest result drivers
- A reopenable How to Play panel that explains the provisional scoring model
- Browser-only autosave with an option to resume an unfinished game
- Animated reach, trust, traffic, and retention summaries
- Rules-based explanations of editorial choices and readership effects
- Final report embeds rules-based explanations of strategy, readership change, retention, subscriber conversion, and scoring
- Day and final reports scroll within the viewport at standard browser zoom
- Key phrases in report explanations are emphasized for scanning

## Editing story scenarios

Story text is stored separately in `data/scenarios.js`. Each scenario has a stable ID, title, topic, story type, and optional scenario-level modifiers. Story types are defined in the same file and assign AI-suitability ratings to selected newsroom tasks: strong fit, useful, neutral, caution, or high stakes.

The data file contains no interface code and can be edited without changing the page layout. It is JavaScript rather than fetched JSON so the downloaded game continues to work when `index.html` is opened directly from a computer. The ratings adjust AI and Human + AI reach/trust contributions; Human assignments remain the baseline.

## Provisional scoring rubric

Each assignment begins with a base contribution:

| Assignment | Reach | Trust |
| --- | ---: | ---: |
| Human | 1 | 3 |
| AI | 3 | 1 |
| Human + AI | 2 | 2 |

Story-type fit then modifies AI-assisted assignments:

| Story fit | AI | Human + AI |
| --- | --- | --- |
| Strong fit | +1 reach, +1 trust | +1 reach, +1 trust |
| Useful | +1 reach | +1 reach |
| Neutral | No change | No change |
| Caution | −1 trust | No change |
| High stakes | −2 trust, with a floor of 0 | −1 trust |

Human assignments are not modified. Daily reach and trust are each normalized to 0–100 using the maximum possible contribution for that day’s particular mix of stories and tasks. Traffic is `round(6 + 0.24 × reach)`. Repeat visitors are `round(traffic × trust ÷ 125)`, capped at total traffic. These rules are playtest mechanics, not empirical claims.

## Editing round events

Global day-level conditions are stored in `data/round-events.js`. Each event can modify reach and trust for Human, AI, and Human + AI assignments across all three stories in that day. The three-item `schedule` determines which event applies to each day.

The included `ai_hype` and `ai_backlash` events are inactive and have neutral values. They establish the data structure without changing current gameplay. For example, a later version could use `schedule: ['ai_hype', null, 'ai_backlash']` and assign nonzero modifiers after the scoring rules have been decided.

## Editing resource constraints

Optional Human and AI resource limits are defined in `data/resource-rules.js`. They are disabled and unrestricted by default. Limits can set daily minimums and maximums, with optional overrides for individual days.

Resource use is calculated separately from assignment labels: Human uses one Human unit, AI uses one AI unit, and Human + AI uses one unit of each. The game code already includes functions for calculating use and identifying violations; a later interface can expose those limits to players when the rules are activated.
- Previous day reports can be reopened from the newsroom log
- Story tabs appear above and below the board with clear incomplete/complete status badges
- Final three-day score using the tabletop board's displayed scoring structure
- Three-column allocation summaries and an animated final breakdown of one-time visitors, repeat visitors, and subscribers
- Replayable final animation explaining assignments → reach/trust → traffic/retention → subscribers/score
- Replay visibly dims, reveals, highlights, and counts up each explanatory step in sequence
- Authorship, copyright, UMD affiliation, funding, non-endorsement, contact, and no-data-collection notice
- Day and final reports reset to their headings instead of opening scrolled to the bottom
- Responsive layout and keyboard-accessible controls
- Playtest prompts and a direct email feedback link in the final report
- A visible loading error if required configuration files are missing

## Important limitation

The numerical effects are placeholders for playtesting, not empirical claims about human or AI performance. The next design phase should test whether players can understand the consequences of their choices and whether the simulation supports the intended classroom discussion.

## Privacy and saved progress

This version does not collect or transmit player data. Progress is saved only in the player’s browser using local storage so an unfinished game can be resumed. Starting a new game replaces the saved progress.

## License

Copyright © 2026 Daniel Trielli. All rights reserved. See `LICENSE.md` for the playtest-use terms.
