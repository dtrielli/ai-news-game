/*
 * AI News Game resource constraints
 *
 * Constraints are disabled by default. When enabled, limits apply to a whole
 * day (all 60 task assignments across its three stories).
 *
 * Human + AI uses one unit of each resource. This keeps resource limits tied
 * to the labor/tools consumed rather than only to the selected button label.
 */
window.AI_NEWS_RESOURCE_RULES = {
  schemaVersion: 1,
  enabled: false,
  scope: 'day',

  assignmentCosts: {
    human: { human: 1, ai: 0 },
    ai: { human: 0, ai: 1 },
    verified: { human: 1, ai: 1 }
  },

  defaultLimits: {
    human: { min: null, max: null },
    ai: { min: null, max: null }
  },

  // Optional day-specific limits. A value here overrides `defaultLimits`.
  dayOverrides: {
    // 2: { human: { min: 10, max: 35 }, ai: { min: 10, max: 35 } }
  }
};
