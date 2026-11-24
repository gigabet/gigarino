/**
 * @generated SignedSource<<6a1e295fc0de681da6f1d4f650527885>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PageStatsQuery$variables = {
  id: string;
};
export type PageStatsQuery$data = {
  readonly event: {
    readonly PageStatsView: {
      readonly " $fragmentSpreads": FragmentRefs<"PageStatsView">;
    };
  } | null | undefined;
};
export type PageStatsQuery = {
  response: PageStatsQuery$data;
  variables: PageStatsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outcome",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competition",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v10 = [
  (v6/*:: as any*/),
  (v7/*:: as any*/),
  (v4/*:: as any*/),
  (v5/*:: as any*/),
  (v8/*:: as any*/),
  (v9/*:: as any*/),
  (v3/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PageStatsQuery",
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
                  "name": "PageStatsView"
                }
              ],
              "type": "Event",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "PageStatsView"
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
    "name": "PageStatsQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "homeCompetitor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awayCompetitor",
            "storageKey": null
          },
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
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
              (v2/*:: as any*/),
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
              (v3/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cancelled",
                "storageKey": null
              },
              (v4/*:: as any*/),
              (v5/*:: as any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
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
              (v2/*:: as any*/)
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
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
                "selections": (v10/*:: as any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PastMatch",
                "kind": "LinkedField",
                "name": "awayRecent",
                "plural": true,
                "selections": (v10/*:: as any*/),
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
                  (v3/*:: as any*/),
                  (v6/*:: as any*/),
                  (v7/*:: as any*/),
                  (v4/*:: as any*/),
                  (v5/*:: as any*/),
                  (v8/*:: as any*/),
                  (v9/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "37c57a050593c32fa09af8193f5b6ecb",
    "id": null,
    "metadata": {},
    "name": "PageStatsQuery",
    "operationKind": "query",
    "text": "query PageStatsQuery(\n  $id: ID!\n) {\n  event(id: $id) {\n    ...PageStatsView\n    id\n  }\n}\n\nfragment PageStatsView on Event {\n  homeCompetitor\n  awayCompetitor\n  ...StatisticsWidget\n}\n\nfragment StatisticsWidget on Event {\n  id\n  status\n  homeCompetitor\n  awayCompetitor\n  timeline(types: [GOAL, RED_CARD, PENALTY, CORNER, YELLOW_CARD]) {\n    id\n  }\n  ...StatisticsWidgetTimeline\n  tournament {\n    standings {\n      groups {\n        __typename\n      }\n    }\n    ...StatisticsWidgetTable\n    id\n  }\n  insights {\n    homePosition\n    awayPosition\n    venue\n    referee\n    round\n    stats {\n      key\n      home\n      away\n    }\n    homeRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    awayRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    headToHead {\n      outcome\n      ...StatisticsWidgetPastMatch\n    }\n  }\n}\n\nfragment StatisticsWidgetIncident on MatchIncident {\n  type\n  minute\n  addedTime\n  scorer\n  detail\n  penalty\n  outcome\n  cancelled\n  homeScore\n  awayScore\n}\n\nfragment StatisticsWidgetPastMatch on PastMatch {\n  homeName\n  awayName\n  homeScore\n  awayScore\n  competition\n  startTime\n  outcome\n}\n\nfragment StatisticsWidgetTable on Tournament {\n  standings {\n    season\n    currentRound\n    maxRounds\n    groups {\n      ...StatisticsWidgetTableGroup\n    }\n  }\n}\n\nfragment StatisticsWidgetTableGroup on StandingGroup {\n  name\n  rows {\n    position\n    teamName\n    played\n    won\n    drawn\n    lost\n    goalsFor\n    goalsAgainst\n    points\n    zone\n  }\n}\n\nfragment StatisticsWidgetTimeline on Event {\n  homeCompetitor\n  awayCompetitor\n  timeline(types: [GOAL, RED_CARD, PENALTY, CORNER, YELLOW_CARD]) {\n    id\n    side\n    minute\n    addedTime\n    ...StatisticsWidgetIncident\n  }\n}\n"
  }
};
})();

(node as any).hash = "b1950557d8f4970f9ed20c2aa4bcd881";

export default node;
