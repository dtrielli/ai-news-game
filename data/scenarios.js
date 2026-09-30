/*
 * AI News Game scenario catalog
 *
 * Edit this file to add or revise stories without changing the game interface.
 * Story-type and scenario modifiers are neutral for now. Future versions can
 * apply these values to reach and trust when AI or Human + AI is selected.
 */
window.AI_NEWS_SCENARIO_DATA = {
  schemaVersion: 1,

  storyTypes: {
    breaking_news: {
      label: 'Breaking news',
      description: 'Fast-developing coverage in which timeliness is unusually important.',
      aiUseModifiers: {
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    },
    public_service: {
      label: 'Public-service reporting',
      description: 'Information that helps audiences make immediate or practical decisions.',
      aiUseModifiers: {
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    },
    accountability: {
      label: 'Accountability reporting',
      description: 'Coverage that scrutinizes institutions, records, decisions, or public power.',
      aiUseModifiers: {
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    },
    community: {
      label: 'Community reporting',
      description: 'Coverage of local institutions, services, and community life.',
      aiUseModifiers: {
        ai: { reach: 0, trust: 0 },
        verified: { reach: 0, trust: 0 }
      }
    }
  },

  scenarios: [
    {
      id: 'local-transit-routes',
      title: 'Transit proposal would redraw three bus routes',
      topic: 'local',
      storyType: 'public_service',
      modifiers: {}
    },
    {
      id: 'climate-flood-warning',
      title: 'Flood warning issued after overnight rain',
      topic: 'climate',
      storyType: 'breaking_news',
      modifiers: {}
    },
    {
      id: 'government-housing-vote',
      title: 'Council prepares to vote on housing rules',
      topic: 'government',
      storyType: 'accountability',
      modifiers: {}
    },
    {
      id: 'health-respiratory-illness',
      title: 'Clinics report an increase in respiratory illness',
      topic: 'health',
      storyType: 'public_service',
      modifiers: {}
    },
    {
      id: 'schools-start-times',
      title: 'District considers changing school start times',
      topic: 'schools',
      storyType: 'community',
      modifiers: {}
    },
    {
      id: 'local-permit-deadline',
      title: 'Small businesses face a new permit deadline',
      topic: 'local',
      storyType: 'public_service',
      modifiers: {}
    },
    {
      id: 'climate-cooling-centers',
      title: 'Heat plan opens cooling centers across the city',
      topic: 'climate',
      storyType: 'public_service',
      modifiers: {}
    },
    {
      id: 'government-inspection-delays',
      title: 'Public records reveal delays in inspections',
      topic: 'government',
      storyType: 'accountability',
      modifiers: {}
    },
    {
      id: 'health-emergency-intake',
      title: 'Hospital announces changes to emergency intake',
      topic: 'health',
      storyType: 'breaking_news',
      modifiers: {}
    }
  ]
};
