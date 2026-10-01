/*
 * AI News Game scenario catalog
 *
 * Edit this file to add or revise stories without changing the game interface.
 * Story types define how suitable AI use is for particular newsroom tasks.
 * Ratings: 2 = strong fit, 1 = useful, 0 = neutral, -1 = caution,
 * -2 = high-stakes AI use. Human assignments are not modified.
 */
window.AI_NEWS_SCENARIO_DATA = {
  schemaVersion: 1,

  storyTypes: {
    breaking_news: {
      label: 'Breaking news',
      description: 'For this type of story, speed and reach are key—but errors can quickly damage trust.',
      taskFit: {
        'Story Summarization': 2, 'Format Adaptation': 2, 'Search Optimization': 2, 'Social Distribution': 2,
        'Headline Writing': 1, 'Story Promotion': 1, 'Audience Targeting': 1, 'Performance Analysis': 1,
        'Interview Processing': -1, 'News Writing': -1, 'Visual Creation': -1,
        'Fact Checking': -2, 'Bias & Fairness Review': -2, 'Content Selection': -2
      }
    },
    public_service: {
      label: 'Public-service reporting',
      description: 'For this type of story, accuracy, accessibility, and reach are key; audiences primarily need useful information quickly and clearly.',
      taskFit: {
        'Story Summarization': 2, 'Format Adaptation': 2, 'Search Optimization': 2, 'Social Distribution': 2,
        'Document Review': 1, 'Data Gathering & Analysis': 1, 'Audience Targeting': 1, 'Performance Analysis': 1,
        'News Writing': -1, 'Headline Writing': -1, 'Visual Creation': -1, 'Story Promotion': -1,
        'Fact Checking': -2, 'Content Selection': -2
      }
    },
    accountability: {
      label: 'Accountability reporting',
      description: 'For this type of story, verification, fairness, and defensible conclusions are key; speed and scale matter less than careful judgment.',
      taskFit: {
        'Document Review': 2, 'Data Gathering & Analysis': 2,
        'Interview Processing': 1, 'Story Summarization': 1, 'Search Optimization': 1, 'Performance Analysis': 1,
        'Research & Source Discovery': -1, 'News Writing': -1, 'Headline Writing': -1, 'Audience Targeting': -1,
        'Fact Checking': -2, 'Bias & Fairness Review': -2, 'Content Selection': -2, 'Visual Creation': -2
      }
    },
    community: {
      label: 'Community reporting',
      description: 'For this type of story, local context, relationships, and representation are key; audiences expect a strong human connection.',
      taskFit: {
        'Format Adaptation': 2, 'Performance Analysis': 2,
        'Interview Processing': 1, 'Story Summarization': 1, 'Search Optimization': 1,
        'Research & Source Discovery': -1, 'News Writing': -1, 'Headline Writing': -1, 'Audience Targeting': -1,
        'Bias & Fairness Review': -2, 'Content Selection': -2, 'Community Management': -2
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
