# AI News Game

**Current build: Website 1.32 with print and online in-class versions**

A barebones digital prototype of the AI News Game. It closely follows the current tabletop board: Reporting, Editing, Packaging, and Audience desks, each containing five tasks.

## Play locally

Open `index.html` in any modern browser to see the landing page. The games themselves require no installation, build step, or account. Analytics and the optional feedback form require an internet connection.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Add the entire `ai-news-game` folder contents to the repository root. Keep the subfolders and file names unchanged.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

GitHub will provide a public URL after the first deployment finishes.

## Current prototype

- A landing page linking to the digital game, expanded digital game, printed classroom version, online classroom version, facilitator guide, and About page
- An online classroom board that matches the printed player board and reports Human, AI, Human + AI, Human-involvement, and AI-involvement totals without running the audience simulation
- A main digital edition with one story per day and an expanded edition with three stories per day
- Three untimed days with a summary after each day in both editions
- Separate browser save states for the main and expanded editions
- Twenty tabletop tasks per story, grouped into four compact desk tabs
- Human, AI, and Human + AI (verified automation) assignments
- A task-specific workflow explanation appears beneath each task after the player chooses Human, AI, or Human + AI
- A footer link opens a dedicated About page with the project’s purpose, mechanics, development status, privacy information, and credits
- The About page includes licensing and classroom-use sections, with a working link to the downloadable pen-and-paper playtest
- The print-and-play page provides separate downloads for the player board and the 10 facilitator cards, plus a link to the online facilitator guide
- The About page identifies the current version and revision date and clearly marks the game as a playtest under active development
- Copyright ownership and formal licensing terms are under review under the University of Maryland’s intellectual-property policy
- Desk-level controls for assigning all five tasks at once
- Choices can be revised until the day is completed
- Provisional readership effects: traffic, one-time visitors, repeat visitors, and subscribers
- A persistent top-level audience breakdown separates one-time visitors, remaining repeat visitors, and subscribers
- Story types that change the consequences of AI and Human + AI assignments for particular tasks
- A live story-level reach and trust outlook that collects the effects of every assignment
- One visible newsroom desk at a time, with compact desk tabs and completion counts
- Explicit TO DO and COMPLETE markings on every story and desk tab
- Task titles and definitions presented together on a single compact line
- A single information-rich story list beside the decision panel, with no repeated story header or bottom story tabs
- The selected story’s live reach and trust outlook placed directly beneath the story list
- Matching story and decision panels with aligned edges, padding, borders, and height
- The active desk fills the decision panel, with navigation and Story outlook anchored to the shared bottom edge
- Evenly expanded task rows that use the full height of the decision board
- Staggered story-entry animation at the beginning of each day
- Story and decision panel titles for clearer hierarchy
- Day and three-day summaries of story-specific AI-use bonuses and penalties
- Task-level explanations identifying which AI or Human + AI assignments caused every story-type bonus or penalty
- Slower, more deliberate story-entry animation
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

## Editing story content

All current story content is stored in `data/stories.js`. It is the single source used by the main digital game, expanded digital game, college facilitator guide, and high-school facilitator guide. The digital HTML files contain no story records of their own.

Each story contains shared identifying information plus separate `digital`, `print.college`, and `print.highSchool` sections. These sections hold the story type, background, reader expectations, editorial focus, discussion prompts, affected tasks, triggering choices, reach or trust change, and the explanation for that effect. The same file also contains the digital story-type rubric and the facilitator scoring matrix. It is JavaScript rather than fetched JSON so the downloaded suite continues to work when opened directly from a computer.

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

Global day-level conditions are stored in `data/round-events.js`. Each event can modify reach and trust for Human, AI, and Human + AI assignments across every story in that day. The three-item `schedule` determines which event applies to each day.

The included `ai_hype` and `ai_backlash` events are inactive and have neutral values. They establish the data structure without changing current gameplay. For example, a later version could use `schedule: ['ai_hype', null, 'ai_backlash']` and assign nonzero modifiers after the scoring rules have been decided.

## Editing resource constraints

Optional Human and AI resource limits are defined in `data/resource-rules.js`. They are disabled and unrestricted by default. Limits can set daily minimums and maximums, with optional overrides for individual days.

Resource use is calculated separately from assignment labels: Human uses one Human unit, AI uses one AI unit, and Human + AI uses one unit of each. The game code already includes functions for calculating use and identifying violations; a later interface can expose those limits to players when the rules are activated.
- Previous day reports can be reopened from the newsroom log
- Final three-day score using the tabletop board's displayed scoring structure
- Three-column allocation summaries and an animated final breakdown of one-time visitors, repeat visitors, and subscribers
- Replayable final animation explaining assignments → reach/trust → traffic/retention → subscribers/score
- Replay visibly dims, reveals, highlights, and counts up each explanatory step in sequence
- Authorship, UMD affiliation, funding, non-endorsement, contact, and no-data-collection notice
- Day and final reports reset to their headings instead of opening scrolled to the bottom
- Responsive layout and keyboard-accessible controls
- A short optional Google Forms feedback link in the final report and About page
- A visible loading error if required configuration files are missing

## Important limitation

The numerical effects are placeholders for playtesting, not empirical claims about human or AI performance. The next design phase should test whether players can understand the consequences of their choices and whether the simulation supports the intended classroom discussion.

## Privacy and saved progress

Gameplay decisions are not collected or transmitted. Progress is saved only in the player’s browser using local storage so an unfinished game can be resumed. Starting a new game replaces the saved progress for that edition. Cookie-free Cloudflare Web Analytics counts visits, and the optional Google feedback form opens separately.

## License

Developed by Daniel Trielli at the University of Maryland. See `LICENSE.md` for the interim use notice.
