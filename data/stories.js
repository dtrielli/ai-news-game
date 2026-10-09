/*
 * AI News Game shared content
 *
 * This is the single source of truth for story text and story-specific rules.
 * Each story contains digital-game settings plus college and high-school
 * facilitator wording. Interface code lives elsewhere.
 *
 * Digital taskFitOverrides use ratings from -2 to 2 and override the selected
 * story type for that story only. Print effects name the triggering choices,
 * outcome, level change, and explanation used by the facilitator calculator.
 */
window.AI_NEWS_CONTENT = {
  "schemaVersion": 2,
  "storyTypes": {
    "breaking_news": {
      "label": "Breaking news",
      "description": "For this type of story, speed and reach are key—but errors can quickly damage trust.",
      "taskFit": {
        "Story Summarization": 2,
        "Format Adaptation": 2,
        "Search Optimization": 2,
        "Social Distribution": 2,
        "Headline Writing": 1,
        "Story Promotion": 1,
        "Audience Targeting": 1,
        "Performance Analysis": 1,
        "Interview Processing": -1,
        "News Writing": -1,
        "Visual Creation": -1,
        "Fact Checking": -2,
        "Bias & Fairness Review": -2,
        "Content Selection": -2
      }
    },
    "public_service": {
      "label": "Public-service reporting",
      "description": "For this type of story, accuracy, accessibility, and reach are key; audiences primarily need useful information quickly and clearly.",
      "taskFit": {
        "Story Summarization": 2,
        "Format Adaptation": 2,
        "Search Optimization": 2,
        "Social Distribution": 2,
        "Document Review": 1,
        "Data Gathering & Analysis": 1,
        "Audience Targeting": 1,
        "Performance Analysis": 1,
        "News Writing": -1,
        "Headline Writing": -1,
        "Visual Creation": -1,
        "Story Promotion": -1,
        "Fact Checking": -2,
        "Content Selection": -2
      }
    },
    "accountability": {
      "label": "Accountability reporting",
      "description": "For this type of story, verification, fairness, and defensible conclusions are key; speed and scale matter less than careful judgment.",
      "taskFit": {
        "Document Review": 2,
        "Data Gathering & Analysis": 2,
        "Interview Processing": 1,
        "Story Summarization": 1,
        "Search Optimization": 1,
        "Performance Analysis": 1,
        "Research & Source Discovery": -1,
        "News Writing": -1,
        "Headline Writing": -1,
        "Audience Targeting": -1,
        "Fact Checking": -2,
        "Bias & Fairness Review": -2,
        "Content Selection": -2,
        "Visual Creation": -2
      }
    },
    "community": {
      "label": "Community reporting",
      "description": "For this type of story, local context, relationships, and representation are key; audiences expect a strong human connection.",
      "taskFit": {
        "Format Adaptation": 2,
        "Performance Analysis": 2,
        "Interview Processing": 1,
        "Story Summarization": 1,
        "Search Optimization": 1,
        "Research & Source Discovery": -1,
        "News Writing": -1,
        "Headline Writing": -1,
        "Audience Targeting": -1,
        "Bias & Fairness Review": -2,
        "Content Selection": -2,
        "Community Management": -2
      }
    }
  },
  "stories": [
    {
      "id": "local-transit-routes",
      "title": "Transit proposal would redraw three bus routes",
      "topic": {
        "key": "local",
        "label": "LOCAL LIFE"
      },
      "digital": {
        "storyType": "public_service",
        "modifiers": {},
        "background": "Officials release a complicated proposal two days before a public hearing. Riders need to understand how their commutes may change.",
        "focus": "Make the plan useful quickly without overlooking neighborhoods that could lose service.",
        "expectation": "Readers expect clear, practical explanations of how the proposed routes would affect their everyday travel, including the neighborhoods that could lose service.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 1,
        "college": {
          "background": "Officials release a complicated proposal two days before a public hearing. Riders need to understand how their commutes may change.",
          "focus": "Make the plan useful quickly without overlooking neighborhoods that could lose service.",
          "expectation": "Readers expect clear, practical explanations of how the proposed routes would affect their everyday travel, including the neighborhoods that could lose service.",
          "discussionPrompts": [
            "Where could AI make a complicated route proposal easier to use?",
            "What might automated analysis miss about how residents actually travel?",
            "Which audience questions would require human judgment?"
          ],
          "effects": [
            {
              "task": "Format Adaptation",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Multiple formats help riders find the changes that affect them."
            },
            {
              "task": "Data Gathering & Analysis",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Unreviewed route analysis may miss local travel patterns."
            },
            {
              "task": "Community Management",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human attention helps address riders' specific questions."
            }
          ]
        },
        "highSchool": {
          "background": "City officials share a plan to change three bus routes. A public meeting is in two days. People need to know how the plan could change their trip to work or school.",
          "focus": "Help people understand the route changes, including who could lose bus service.",
          "expectation": "Readers want to know how the changes would affect their daily trips and which neighborhoods could lose service.",
          "discussionPrompts": [
            "How could AI help explain the new bus routes?",
            "What might AI miss about how people actually use the buses?",
            "Which questions from readers would need a person to answer?"
          ],
          "effects": [
            {
              "task": "Format Adaptation",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Different formats help riders find the changes that affect them."
            },
            {
              "task": "Data Gathering & Analysis",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Without a person checking, AI may miss how people really travel."
            },
            {
              "task": "Community Management",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person can respond to each rider’s questions."
            }
          ]
        }
      }
    },
    {
      "id": "climate-flood-warning",
      "title": "Flood warning issued after overnight rain",
      "topic": {
        "key": "climate",
        "label": "CLIMATE"
      },
      "digital": {
        "storyType": "breaking_news",
        "modifiers": {},
        "background": "Water is rising in several neighborhoods. Conditions and road closures are changing throughout the morning.",
        "focus": "Reach people quickly while keeping urgent information accurate and current.",
        "expectation": "Readers expect fast, accurate updates they can act on: which places are at risk, which roads are closed, and what to do as conditions change.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 2,
        "college": {
          "background": "Water is rising in several neighborhoods. Conditions and road closures are changing throughout the morning.",
          "focus": "Reach people quickly while keeping urgent information accurate and current.",
          "expectation": "Readers expect fast, accurate updates they can act on: which places are at risk, which roads are closed, and what to do as conditions change.",
          "discussionPrompts": [
            "Where could AI help urgent information reach people faster?",
            "Which errors would create the greatest immediate harm?",
            "Who should decide which updates deserve the most attention?"
          ],
          "effects": [
            {
              "task": "Social Distribution",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Rapid distribution helps urgent information travel."
            },
            {
              "task": "Fact Checking",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "An unreviewed mistake can create immediate harm."
            },
            {
              "task": "Content Selection",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Editorial judgment keeps the most urgent updates prominent."
            }
          ]
        },
        "highSchool": {
          "background": "Heavy rain is flooding some neighborhoods. Road closures and water levels are changing. People need updates they can rely on.",
          "focus": "Share useful updates quickly, and keep checking that they are right.",
          "expectation": "Readers want quick, correct updates about dangerous areas, closed roads, and what to do.",
          "discussionPrompts": [
            "Where could AI help get flood warnings to people quickly?",
            "What could go wrong if an AI update uses old or incorrect information?",
            "Which facts should a person check before sharing an update?"
          ],
          "effects": [
            {
              "task": "Social Distribution",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Fast sharing helps flood warnings reach people."
            },
            {
              "task": "Fact Checking",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Wrong details in an urgent warning can hurt people’s trust."
            },
            {
              "task": "Content Selection",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks which updates are most useful and urgent."
            }
          ]
        }
      }
    },
    {
      "id": "government-housing-vote",
      "title": "Council prepares to vote on new housing rules",
      "topic": {
        "key": "government",
        "label": "GOVERNMENT"
      },
      "digital": {
        "storyType": "accountability",
        "modifiers": {},
        "background": "The proposal has changed several times and interest groups disagree about who would benefit. A final vote is expected tonight.",
        "focus": "Explain the policy and competing claims without reducing a complex debate to slogans.",
        "expectation": "Readers expect a clear explanation of the proposed rules, who would be affected, and how competing claims are supported by evidence.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 3,
        "college": {
          "background": "The proposal has changed several times and interest groups disagree about who would benefit. A final vote is expected tonight.",
          "focus": "Explain the policy and competing claims without reducing a complex debate to slogans.",
          "expectation": "Readers expect a clear explanation of the proposed rules, who would be affected, and how competing claims are supported by evidence.",
          "discussionPrompts": [
            "Where could AI help compare several versions of the proposal?",
            "Which parts of fairness and impact require contextual judgment?",
            "Which contested claims need direct human verification?"
          ],
          "effects": [
            {
              "task": "Document Review",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Fast comparison helps surface changes across drafts."
            },
            {
              "task": "Bias & Fairness Review",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Fairness requires contextual judgment about affected groups."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human review strengthens confidence in contested claims."
            }
          ]
        },
        "highSchool": {
          "background": "The city council is about to vote on new housing rules. Different groups disagree about what the rules would do and who they would help.",
          "focus": "Explain the rules and the disagreements clearly, and check the claims.",
          "expectation": "Readers want to understand the new rules, who would be affected, and whether people’s claims are supported by facts.",
          "discussionPrompts": [
            "How could AI help explain a long set of housing rules?",
            "What might be left out of an AI summary of the debate?",
            "Which claims should a person check carefully?"
          ],
          "effects": [
            {
              "task": "Document Review",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help work through long policy documents."
            },
            {
              "task": "Bias & Fairness Review",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Without a person checking fairness, important views may be left out."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks the evidence behind people’s claims."
            }
          ]
        }
      }
    },
    {
      "id": "health-respiratory-illness",
      "title": "Clinics report an increase in respiratory illness",
      "topic": {
        "key": "health",
        "label": "PUBLIC HEALTH"
      },
      "digital": {
        "storyType": "public_service",
        "modifiers": {},
        "background": "Several clinics report similar symptoms, but public health officials have not identified a cause. Readers are asking what they should do.",
        "focus": "Provide useful guidance without overstating uncertain evidence.",
        "expectation": "Readers expect useful health information that distinguishes what is known from what remains uncertain, without overstating the risks.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 4,
        "college": {
          "background": "Several clinics report similar symptoms, but public health officials have not identified a cause. Readers are asking what they should do.",
          "focus": "Provide useful guidance without overstating uncertain evidence.",
          "expectation": "Readers expect useful health information that distinguishes what is known from what remains uncertain, without overstating the risks.",
          "discussionPrompts": [
            "Where could AI help locate relevant guidance and expertise?",
            "How could automated writing overstate uncertain evidence?",
            "Which health claims need the strongest human verification?"
          ],
          "effects": [
            {
              "task": "Research & Source Discovery",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Broader source discovery can quickly connect useful guidance."
            },
            {
              "task": "News Writing",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Automated drafting may state uncertain evidence too confidently."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human verification helps preserve uncertainty and context."
            }
          ]
        },
        "highSchool": {
          "background": "Local clinics are seeing more people with breathing illnesses. Health workers are still studying what is causing the increase.",
          "focus": "Give useful health information without making the evidence sound more certain than it is.",
          "expectation": "Readers want useful health advice that makes clear what doctors know and what they are still trying to find out.",
          "discussionPrompts": [
            "How could AI help find useful health sources?",
            "What could go wrong if AI makes a health risk sound certain when it is not?",
            "Which health claims should a person check?"
          ],
          "effects": [
            {
              "task": "Research & Source Discovery",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help find health sources quickly."
            },
            {
              "task": "News Writing",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "AI writing without human checking may sound too certain about the evidence."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks the health claims and warnings."
            }
          ]
        }
      }
    },
    {
      "id": "schools-start-times",
      "title": "District considers changing school start times",
      "topic": {
        "key": "schools",
        "label": "SCHOOLS"
      },
      "digital": {
        "storyType": "community",
        "modifiers": {},
        "background": "The proposal affects transportation, after-school programs, family schedules, and student sleep. The district will hold listening sessions.",
        "focus": "Represent the people affected and explain consequences across the community.",
        "expectation": "Readers expect the coverage to represent students, families, and staff fairly and explain how a change would affect different people.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 5,
        "college": {
          "background": "The proposal affects transportation, after-school programs, family schedules, and student sleep. The district will hold listening sessions.",
          "focus": "Represent the people affected and explain consequences across the community.",
          "expectation": "Readers expect the coverage to represent students, families, and staff fairly and explain how a change would affect different people.",
          "discussionPrompts": [
            "Which personal accounts could lose meaning through automation?",
            "Could AI help reach families with different information needs?",
            "Which community concerns require a person to respond?"
          ],
          "effects": [
            {
              "task": "Interview Processing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Review protects nuance in students' and families' accounts."
            },
            {
              "task": "Audience Targeting",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Targeting can reach families with different information needs."
            },
            {
              "task": "Community Management",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Automated responses can mishandle personal concerns."
            }
          ]
        },
        "highSchool": {
          "background": "A school district may change when classes start. Students, families, teachers, and bus drivers could be affected in different ways.",
          "focus": "Explain how the change could affect different people, and listen to their concerns.",
          "expectation": "Readers want to hear from the people affected and understand what the change could mean for their day.",
          "discussionPrompts": [
            "Why might a person need to listen carefully to interviews about this change?",
            "How could AI help the news reach different groups?",
            "What could be lost if AI handled every reader comment on its own?"
          ],
          "effects": [
            {
              "task": "Interview Processing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks that interview summaries keep what people meant."
            },
            {
              "task": "Audience Targeting",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help reach different groups affected by the change."
            },
            {
              "task": "Community Management",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "AI handling comments alone may miss people’s concerns."
            }
          ]
        }
      }
    },
    {
      "id": "local-permit-deadline",
      "title": "Small businesses face a new permit deadline",
      "topic": {
        "key": "local",
        "label": "LOCAL LIFE"
      },
      "digital": {
        "storyType": "public_service",
        "modifiers": {},
        "background": "A new online filing process begins next week. Some owners say the instructions are confusing and available only in English.",
        "focus": "Make the requirements accessible to the people who need to act.",
        "expectation": "Readers expect accessible, practical guidance about the requirements, the deadline, and what they need to do to comply.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 6,
        "college": {
          "background": "A new online filing process begins next week. Some owners say the instructions are confusing and available only in English.",
          "focus": "Make the requirements accessible to the people who need to act.",
          "expectation": "Readers expect accessible, practical guidance about the requirements, the deadline, and what they need to do to comply.",
          "discussionPrompts": [
            "Could AI make the permit instructions easier to summarize or translate?",
            "Which formats would help owners find and use the information?",
            "What language or access barriers might automation overlook?"
          ],
          "effects": [
            {
              "task": "Story Summarization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "A concise checklist makes the requirements easier to use."
            },
            {
              "task": "Format Adaptation",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Multiple formats can reach owners across platforms."
            },
            {
              "task": "Bias & Fairness Review",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Automated review may miss language and access barriers."
            }
          ]
        },
        "highSchool": {
          "background": "Small businesses must meet a new permit deadline. Some owners are unsure which forms to fill out or what the new rules require.",
          "focus": "Make the rules and deadline easy to understand for people who need to act.",
          "expectation": "Readers want clear instructions: what to do, which forms to use, and when the work is due.",
          "discussionPrompts": [
            "How could AI help turn a long list of rules into useful instructions?",
            "Which groups might an AI-written guide fail to help?",
            "Where would a person need to check whether the guide is fair and clear?"
          ],
          "effects": [
            {
              "task": "Story Summarization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help turn long rules into a short guide."
            },
            {
              "task": "Format Adaptation",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Different formats make the instructions easier to use."
            },
            {
              "task": "Bias & Fairness Review",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Without a fairness check, the guide may leave some owners out."
            }
          ]
        }
      }
    },
    {
      "id": "climate-cooling-centers",
      "title": "City opens cooling centers during a heat emergency",
      "topic": {
        "key": "climate",
        "label": "CLIMATE"
      },
      "digital": {
        "storyType": "public_service",
        "modifiers": {},
        "background": "Temperatures are expected to remain dangerous for three days. Hours, transportation, and capacity differ among locations.",
        "focus": "Distribute accurate, accessible information to residents at greatest risk.",
        "expectation": "Readers expect timely, accurate guidance about where to find cooling centers, how to reach them, and which residents may need additional support.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 7,
        "college": {
          "background": "Temperatures are expected to remain dangerous for three days. Hours, transportation, and capacity differ among locations.",
          "focus": "Distribute accurate, accessible information to residents at greatest risk.",
          "expectation": "Readers expect timely, accurate guidance about where to find cooling centers, how to reach them, and which residents may need additional support.",
          "discussionPrompts": [
            "Where could AI help residents locate cooling centers quickly?",
            "Which mistakes in maps or hours could create safety risks?",
            "What information should a person verify before publication?"
          ],
          "effects": [
            {
              "task": "Search Optimization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Search visibility helps residents find locations quickly."
            },
            {
              "task": "Visual Creation",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Generated maps may introduce dangerous location errors."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human review confirms locations, hours, and transportation."
            }
          ]
        },
        "highSchool": {
          "background": "During very hot weather, the city opens places where people can go to cool down. Residents need the right locations, hours, and travel information.",
          "focus": "Help people at risk find safe places to cool down.",
          "expectation": "Readers want correct details about where to go, when the centers are open, and how to get there.",
          "discussionPrompts": [
            "How could AI help people find cooling-center information?",
            "What could go wrong if AI made an incorrect map or picture?",
            "Which details should a person check before publishing?"
          ],
          "effects": [
            {
              "task": "Search Optimization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help people find the cooling-center details."
            },
            {
              "task": "Visual Creation",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "An AI-made map or picture could show the wrong information."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks locations, opening hours, and travel details."
            }
          ]
        }
      }
    },
    {
      "id": "government-inspection-delays",
      "title": "Public records reveal delays in safety inspections",
      "topic": {
        "key": "government",
        "label": "GOVERNMENT"
      },
      "digital": {
        "storyType": "accountability",
        "modifiers": {},
        "background": "Records show a growing backlog, but agencies dispute how the delays should be measured and whether residents were placed at risk.",
        "focus": "Build defensible conclusions from incomplete records and competing explanations.",
        "expectation": "Readers expect evidence-based accountability reporting: a clear explanation of how delays are measured, what the records can establish, and what remains uncertain about the risks to residents.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 8,
        "college": {
          "background": "Records show a growing backlog, but agencies dispute how the delays should be measured and whether residents were placed at risk.",
          "focus": "Build defensible conclusions from incomplete records and competing explanations.",
          "expectation": "Readers expect evidence-based accountability reporting: a clear explanation of how delays are measured, what the records can establish, and what remains uncertain about the risks to residents.",
          "discussionPrompts": [
            "Where could AI help process a large collection of public records?",
            "How could an automated definition of delay distort the findings?",
            "Which conclusions require human judgment about the evidence?"
          ],
          "effects": [
            {
              "task": "Document Review",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Assisted review can process a large record set."
            },
            {
              "task": "Data Gathering & Analysis",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Unreviewed analysis may encode a misleading definition of delay."
            },
            {
              "task": "News Writing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human judgment helps match the claims to the evidence."
            }
          ]
        },
        "highSchool": {
          "background": "Government records show that safety inspections are falling behind. Agencies disagree about what counts as a delay and whether people were put in danger.",
          "focus": "Check what the records really show before making claims about delays or risks.",
          "expectation": "Readers want clear answers about which checks were late, how delays were counted, and whether the records show a risk to people.",
          "discussionPrompts": [
            "How could AI help look through lots of government records?",
            "What could go wrong if AI used the wrong meaning of “late”?",
            "Which conclusions should a person check against the evidence?"
          ],
          "effects": [
            {
              "task": "Document Review",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help read through many records."
            },
            {
              "task": "Data Gathering & Analysis",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Without human checking, AI could use a misleading way to count delays."
            },
            {
              "task": "News Writing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person makes sure the story’s claims match the evidence."
            }
          ]
        }
      }
    },
    {
      "id": "health-emergency-intake",
      "title": "Hospital changes its emergency intake process",
      "topic": {
        "key": "health",
        "label": "PUBLIC HEALTH"
      },
      "digital": {
        "storyType": "breaking_news",
        "modifiers": {},
        "background": "The hospital says a new system will reduce waiting times. Nurses raise concerns about how patients will be prioritized.",
        "focus": "Explain the practical change while examining claims made by both management and staff.",
        "expectation": "Readers expect clear guidance about how the new process affects patients, alongside careful examination of the claims made by hospital management and staff.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 9,
        "college": {
          "background": "The hospital says a new system will reduce waiting times. Nurses raise concerns about how patients will be prioritized.",
          "focus": "Explain the practical change while examining claims made by both management and staff.",
          "expectation": "Readers expect clear guidance about how the new process affects patients, alongside careful examination of the claims made by hospital management and staff.",
          "discussionPrompts": [
            "Which staff and patient accounts require careful human review?",
            "Could automated promotion repeat claims that have not been tested?",
            "Where could AI help patients find the new instructions?"
          ],
          "effects": [
            {
              "task": "Interview Processing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Review protects nuance in staff and patient accounts."
            },
            {
              "task": "Story Promotion",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Automated promotion may repeat an untested efficiency claim."
            },
            {
              "task": "Search Optimization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Search visibility helps patients find the new instructions."
            }
          ]
        },
        "highSchool": {
          "background": "A hospital changes how it admits emergency patients. Managers say the change will cut waiting times. Nurses worry about how the hospital will decide who gets help first.",
          "focus": "Explain the change and check what managers and staff say about it.",
          "expectation": "Readers want to know how the change affects patients and whether the hospital’s promises are supported by facts.",
          "discussionPrompts": [
            "Why should a person check what staff and patients say?",
            "What could go wrong if AI promoted the hospital’s promises before they were checked?",
            "How could AI help patients find the new instructions?"
          ],
          "effects": [
            {
              "task": "Interview Processing",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks what staff and patients meant."
            },
            {
              "task": "Story Promotion",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "AI promotion could repeat a promise that has not been checked."
            },
            {
              "task": "Search Optimization",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "AI can help patients find the new instructions in search results."
            }
          ]
        }
      }
    },
    {
      "id": "elections-polling-place-misinformation",
      "title": "False polling-place information spreads online",
      "topic": {
        "key": "elections",
        "label": "ELECTIONS"
      },
      "digital": {
        "storyType": "breaking_news",
        "modifiers": {},
        "background": "Posts list incorrect voting locations and times. Election officials have issued a correction, but the false posts continue to circulate.",
        "focus": "Correct misinformation quickly without amplifying it or confusing voters further.",
        "expectation": "Readers expect verified voting information, a clear correction of the false claims, and guidance that helps them find the right polling place without adding confusion.",
        "taskFitOverrides": {}
      },
      "print": {
        "order": 10,
        "college": {
          "background": "Posts list incorrect voting locations and times. Election officials have issued a correction, but the false posts continue to circulate.",
          "focus": "Correct misinformation quickly without amplifying it or confusing voters further.",
          "expectation": "Readers expect verified voting information, a clear correction of the false claims, and guidance that helps them find the right polling place without adding confusion.",
          "discussionPrompts": [
            "Where could AI help distribute a correction quickly?",
            "How might automation accidentally amplify the false information?",
            "Which details must be checked against official records?"
          ],
          "effects": [
            {
              "task": "Social Distribution",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Fast distribution helps the correction reach voters."
            },
            {
              "task": "Story Promotion",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "Automated promotion may repeat or amplify the false claim."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "Human verification anchors the correction in official records."
            }
          ]
        },
        "highSchool": {
          "background": "Online posts list the wrong places and times to vote. Election officials have shared the correct details, but people are still sharing the false posts.",
          "focus": "Share the correct voting details without spreading the false information further.",
          "expectation": "Readers want the correct place and time to vote, plus a clear explanation of which posts are wrong.",
          "discussionPrompts": [
            "How could AI help share the correct voting details quickly?",
            "How might AI accidentally spread the false details again?",
            "Which voting details should a person check with election officials?"
          ],
          "effects": [
            {
              "task": "Social Distribution",
              "condition": "AI or Human + AI",
              "choices": [
                "ai",
                "verified"
              ],
              "outcome": "reach",
              "delta": 1,
              "reason": "Fast sharing helps correct details reach voters."
            },
            {
              "task": "Story Promotion",
              "condition": "AI only",
              "choices": [
                "ai"
              ],
              "outcome": "trust",
              "delta": -1,
              "reason": "AI promotion could spread the false claim again."
            },
            {
              "task": "Fact Checking",
              "condition": "Human or Human + AI",
              "choices": [
                "human",
                "verified"
              ],
              "outcome": "trust",
              "delta": 1,
              "reason": "A person checks the correction against official election information."
            }
          ]
        }
      }
    }
  ],
  "facilitator": {
    "matrix": [
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5
      ],
      [
        null,
        null,
        null,
        null,
        null,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        4
      ],
      [
        null,
        null,
        null,
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4
      ],
      [
        null,
        null,
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4
      ],
      [
        null,
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        4
      ],
      [
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3
      ]
    ],
    "levels": [
      "Very low",
      "Low",
      "Average",
      "High",
      "Very high"
    ]
  }
};
