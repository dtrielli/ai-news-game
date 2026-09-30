/*
 * AI News Game round-event catalog
 *
 * A round event applies globally to all three stories on one day. To activate
 * events, place event IDs in `schedule`. Example: ['ai_hype', null, 'ai_backlash'].
 * Modifier values are additive points per assignment and are neutral for now.
 */
window.AI_NEWS_ROUND_EVENT_DATA = {
  schemaVersion: 1,

  // One entry for each of the game's three days. `null` means no global event.
  schedule: [null, null, null],

  events: [
    {
      id: 'ai_hype',
      label: 'AI hype',
      description: 'Audience and industry enthusiasm increases the short-term appeal of AI-mediated newswork.',
      choiceModifiers: {
        human: { reach: 0, trust: 0 },
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    },
    {
      id: 'ai_backlash',
      label: 'AI backlash',
      description: 'Public concern about automation changes how audiences respond to visible AI use.',
      choiceModifiers: {
        human: { reach: 0, trust: 0 },
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    }
  ]
};
