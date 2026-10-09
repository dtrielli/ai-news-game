# Editing AI News Game stories

Edit `stories.js` to change story content across the game suite. It is loaded by both digital editions and both facilitator guides.

Each object in `stories` contains:

- `id`, `title`, and `topic`: shared story information.
- `digital`: the text and scoring settings used by both digital editions.
- `print.college`: college-level facilitator wording, prompts, and effects.
- `print.highSchool`: high-school facilitator wording, prompts, and effects.

## Digital scoring

`storyType` selects a rubric from the top-level `storyTypes` section. Each task rating determines how AI-assisted work changes reach and trust:

| Rating | Meaning |
| ---: | --- |
| `2` | Strong fit: AI and Human + AI gain reach and trust. |
| `1` | Useful: AI and Human + AI gain reach. |
| `0` | Neutral: no story-type adjustment. |
| `-1` | Caution: AI loses trust. |
| `-2` | High stakes: AI loses more trust; Human + AI loses less. |

Use `taskFitOverrides` inside one story to change a task rating only for that story. For example:

```js
"taskFitOverrides": {
  "Fact Checking": -2,
  "Social Distribution": 2
}
```

## Facilitator scoring

Each item in `effects` contains:

- `task`: the task checked by the facilitator.
- `condition`: the readable description shown in the guide.
- `choices`: which selections trigger the effect: `human`, `ai`, or `verified` for Human + AI.
- `outcome`: `reach` or `trust`.
- `delta`: the number of levels added or removed, usually `1` or `-1`.
- `reason`: the explanation shown to the facilitator and players.

Keep three effects and three discussion prompts per print version unless the facilitator interface is also revised.

The PDF in `print-and-play` is a fixed export. Changes to `stories.js` update the online facilitator guides immediately but do not rewrite that PDF automatically.
