/**
 * @generated SignedSource<<cad5b78ebc660e50690ec005c1acefdd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleViewQuery$variables = {
  id: string;
  showStats: boolean;
};
export type PrematchSingleViewQuery$data = {
  readonly event: {
    readonly PrematchSingleView: {
      readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleView">;
    };
  } | null | undefined;
};
export type PrematchSingleViewQuery = {
  response: PrematchSingleViewQuery$data;
  variables: PrematchSingleViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "showStats"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outcome",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeName",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competition",
  "storageKey": null
},
v15 = [
  (v12/*:: as any*/),
  (v13/*:: as any*/),
  (v9/*:: as any*/),
  (v10/*:: as any*/),
  (v14/*:: as any*/),
  (v4/*:: as any*/),
  (v11/*:: as any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "suspensionReason",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchSingleViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "fragment": {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PrematchSingleView"
                }
              ],
              "type": "Event",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "PrematchSingleView"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "PrematchSingleViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "homeImageUrl",
            "storageKey": null
          },
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awayImageUrl",
            "storageKey": null
          },
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sport",
            "kind": "LinkedField",
            "name": "sport",
            "plural": false,
            "selections": [
              (v5/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v5/*:: as any*/),
              (v7/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "category",
            "plural": false,
            "selections": [
              (v7/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "storageKey": null
          },
          (v8/*:: as any*/),
          (v6/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFavourite",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isLive",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tradingStatus",
            "storageKey": null
          },
          (v9/*:: as any*/),
          (v10/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sportradarMatchId",
            "storageKey": null
          },
          {
            "condition": "showStats",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "if": null,
                "kind": "Defer",
                "label": "PrematchSingleView$defer$StatisticsWidget",
                "selections": [
                  (v6/*:: as any*/),
                  (v8/*:: as any*/),
                  (v2/*:: as any*/),
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "types",
                        "value": [
                          "GOAL",
                          "RED_CARD",
                          "PENALTY",
                          "CORNER",
                          "YELLOW_CARD"
                        ]
                      }
                    ],
                    "concreteType": "MatchIncident",
                    "kind": "LinkedField",
                    "name": "timeline",
                    "plural": true,
                    "selections": [
                      (v6/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "side",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "minute",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addedTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "scorer",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "detail",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "penalty",
                        "storageKey": null
                      },
                      (v11/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cancelled",
                        "storageKey": null
                      },
                      (v9/*:: as any*/),
                      (v10/*:: as any*/)
                    ],
                    "storageKey": "timeline(types:[\"GOAL\",\"RED_CARD\",\"PENALTY\",\"CORNER\",\"YELLOW_CARD\"])"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Standings",
                        "kind": "LinkedField",
                        "name": "standings",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "StandingGroup",
                            "kind": "LinkedField",
                            "name": "groups",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "__typename",
                                "storageKey": null
                              },
                              (v7/*:: as any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "StandingRow",
                                "kind": "LinkedField",
                                "name": "rows",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "position",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "teamName",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "played",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "won",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "drawn",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lost",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "goalsFor",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "goalsAgainst",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "points",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "zone",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "season",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currentRound",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "maxRounds",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MatchInsights",
                    "kind": "LinkedField",
                    "name": "insights",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "homePosition",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "awayPosition",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "venue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "referee",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "round",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MatchStat",
                        "kind": "LinkedField",
                        "name": "stats",
                        "plural": true,
                        "selections": [
                          (v5/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "home",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "away",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PastMatch",
                        "kind": "LinkedField",
                        "name": "homeRecent",
                        "plural": true,
                        "selections": (v15/*:: as any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PastMatch",
                        "kind": "LinkedField",
                        "name": "awayRecent",
                        "plural": true,
                        "selections": (v15/*:: as any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PastMatch",
                        "kind": "LinkedField",
                        "name": "headToHead",
                        "plural": true,
                        "selections": [
                          (v11/*:: as any*/),
                          (v12/*:: as any*/),
                          (v13/*:: as any*/),
                          (v9/*:: as any*/),
                          (v10/*:: as any*/),
                          (v14/*:: as any*/),
                          (v4/*:: as any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "PrematchSingleView$defer$MarketGroups",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Market",
                "kind": "LinkedField",
                "name": "markets",
                "plural": true,
                "selections": [
                  (v6/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "groups",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "kind",
                    "storageKey": null
                  },
                  (v16/*:: as any*/),
                  (v7/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "line",
                    "storageKey": null
                  },
                  (v8/*:: as any*/),
                  (v17/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Outcome",
                    "kind": "LinkedField",
                    "name": "outcomes",
                    "plural": true,
                    "selections": [
                      (v6/*:: as any*/),
                      (v16/*:: as any*/),
                      (v7/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "price",
                        "storageKey": null
                      },
                      (v8/*:: as any*/),
                      (v17/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7ebb462b75ca2d978c5eb586b4ebe402",
    "id": null,
    "metadata": {},
    "name": "PrematchSingleViewQuery",
    "operationKind": "query",
    "text": "query PrematchSingleViewQuery(\n  $id: ID!\n  $showStats: Boolean!\n) {\n  event(id: $id) {\n    ...PrematchSingleView\n    id\n  }\n}\n\nfragment EventLiveState on Event {\n  status\n  tradingStatus\n  homeScore\n  awayScore\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment MarketCard on Market {\n  name\n  line\n  status\n  suspensionReason\n  outcomes {\n    id\n    index\n    name\n    price\n    status\n    suspensionReason\n  }\n}\n\nfragment MarketGroups on Event {\n  markets {\n    id\n    groups\n    kind\n    index\n    ...MarketCard\n  }\n}\n\nfragment MatchTracker on Event {\n  sportradarMatchId\n}\n\nfragment PrematchSingleHeader on Event {\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    name\n    id\n  }\n  category {\n    name\n    id\n  }\n  status\n  ...FavouriteButton\n}\n\nfragment PrematchSingleView on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n  startTime\n  ...PrematchSingleHeader\n  ...EventLiveState\n  ...MatchTracker\n  ...StatisticsWidget @include(if: $showStats) @defer(label: \"PrematchSingleView$defer$StatisticsWidget\")\n  ...MarketGroups @defer(label: \"PrematchSingleView$defer$MarketGroups\")\n}\n\nfragment StatisticsWidget on Event {\n  id\n  status\n  homeCompetitor\n  awayCompetitor\n  timeline(types: [GOAL, RED_CARD, PENALTY, CORNER, YELLOW_CARD]) {\n    id\n  }\n  ...StatisticsWidgetTimeline\n  tournament {\n    standings {\n      groups {\n        __typename\n      }\n    }\n    ...StatisticsWidgetTable\n    id\n  }\n  insights {\n    homePosition\n    awayPosition\n    venue\n    referee\n    round\n    stats {\n      key\n      home\n      away\n    }\n    homeRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    awayRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    headToHead {\n      outcome\n      ...StatisticsWidgetPastMatch\n    }\n  }\n}\n\nfragment StatisticsWidgetIncident on MatchIncident {\n  type\n  minute\n  addedTime\n  scorer\n  detail\n  penalty\n  outcome\n  cancelled\n  homeScore\n  awayScore\n}\n\nfragment StatisticsWidgetPastMatch on PastMatch {\n  homeName\n  awayName\n  homeScore\n  awayScore\n  competition\n  startTime\n  outcome\n}\n\nfragment StatisticsWidgetTable on Tournament {\n  standings {\n    season\n    currentRound\n    maxRounds\n    groups {\n      ...StatisticsWidgetTableGroup\n    }\n  }\n}\n\nfragment StatisticsWidgetTableGroup on StandingGroup {\n  name\n  rows {\n    position\n    teamName\n    played\n    won\n    drawn\n    lost\n    goalsFor\n    goalsAgainst\n    points\n    zone\n  }\n}\n\nfragment StatisticsWidgetTimeline on Event {\n  homeCompetitor\n  awayCompetitor\n  timeline(types: [GOAL, RED_CARD, PENALTY, CORNER, YELLOW_CARD]) {\n    id\n    side\n    minute\n    addedTime\n    ...StatisticsWidgetIncident\n  }\n}\n"
  }
};
})();

(node as any).hash = "509dea1c210c0a1750905a288753cdb9";

export default node;
