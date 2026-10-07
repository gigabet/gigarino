/**
 * @generated SignedSource<<852b1799379b1e6ef34cb944072f4478>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchLayoutQuery$variables = {
  eventId?: string | null | undefined;
  hasEvent: boolean;
};
export type PrematchLayoutQuery$data = {
  readonly eventSidebar?: {
    readonly " $fragmentSpreads": FragmentRefs<"EventSidebar">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Sidebar">;
};
export type PrematchLayoutQuery = {
  response: PrematchLayoutQuery$data;
  variables: PrematchLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": "",
  "kind": "LocalArgument",
  "name": "eventId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasEvent"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchLayoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Sidebar"
      },
      {
        "condition": "hasEvent",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "fragment": {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "EventSidebar"
                }
              ],
              "type": "Query",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "eventSidebar"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "PrematchLayoutQuery",
    "selections": [
      {
        "if": null,
        "kind": "Stream",
        "label": "Sidebar$stream$sports",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Sport",
            "kind": "LinkedField",
            "name": "sports",
            "plural": true,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              (v5/*:: as any*/)
            ],
            "storageKey": null
          }
        ]
      },
      {
        "if": null,
        "kind": "Stream",
        "label": "Sidebar$stream$sb_topTournaments_3z2gQm",
        "selections": [
          {
            "alias": "sb_topTournaments",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 4
              }
            ],
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v4/*:: as any*/),
              (v5/*:: as any*/)
            ],
            "storageKey": "topTournaments(first:4)"
          }
        ]
      },
      {
        "condition": "hasEvent",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "eventId"
              }
            ],
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              (v5/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournament",
                "plural": false,
                "selections": [
                  (v5/*:: as any*/),
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sport",
                    "kind": "LinkedField",
                    "name": "sport",
                    "plural": false,
                    "selections": [
                      (v2/*:: as any*/),
                      (v5/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 20
                      }
                    ],
                    "concreteType": "EventConnection",
                    "kind": "LinkedField",
                    "name": "events",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Event",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v5/*:: as any*/),
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "startTime",
                                "storageKey": null
                              },
                              (v6/*:: as any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "groups",
                                    "value": [
                                      "MAIN"
                                    ]
                                  }
                                ],
                                "concreteType": "Market",
                                "kind": "LinkedField",
                                "name": "markets",
                                "plural": true,
                                "selections": [
                                  (v5/*:: as any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "kind",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Outcome",
                                    "kind": "LinkedField",
                                    "name": "outcomes",
                                    "plural": true,
                                    "selections": [
                                      (v5/*:: as any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "index",
                                        "storageKey": null
                                      },
                                      (v3/*:: as any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "price",
                                        "storageKey": null
                                      },
                                      (v6/*:: as any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "markets(groups:[\"MAIN\"])"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "events(first:20)"
                  }
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
  "params": {
    "cacheID": "778cf74a7c2691bf562f9dcdbea75d50",
    "id": null,
    "metadata": {},
    "name": "PrematchLayoutQuery",
    "operationKind": "query",
    "text": "query PrematchLayoutQuery(\n  $hasEvent: Boolean!\n  $eventId: ID = \"\"\n) {\n  ...Sidebar\n  ...EventSidebar @include(if: $hasEvent)\n}\n\nfragment EventSidebar on Query {\n  event(id: $eventId) {\n    id\n    tournament {\n      ...EventSidebarTournament\n      id\n    }\n  }\n}\n\nfragment EventSidebarMarket on Market {\n  id\n  kind\n  outcomes {\n    id\n    index\n    ...EventSidebarOdd\n  }\n}\n\nfragment EventSidebarOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment EventSidebarTournament on Tournament {\n  id\n  name\n  sport {\n    key\n    id\n  }\n  events(first: 20) {\n    edges {\n      node {\n        id\n        ...EventStripCard\n      }\n    }\n  }\n}\n\nfragment EventStripCard on Event {\n  id\n  homeCompetitor\n  awayCompetitor\n  startTime\n  status\n  markets(groups: [MAIN]) {\n    id\n    kind\n    ...EventSidebarMarket\n  }\n}\n\nfragment Sidebar on Query {\n  sports @stream(label: \"Sidebar$stream$sports\", initialCount: 4) {\n    key\n    name\n    eventCount\n    ...SidebarSport\n    id\n  }\n  sb_topTournaments: topTournaments(first: 4) @stream(label: \"Sidebar$stream$sb_topTournaments_3z2gQm\", initialCount: 1) {\n    eventCount\n    id\n  }\n}\n\nfragment SidebarSport on Sport {\n  key\n  name\n  eventCount\n}\n"
  }
};
})();

(node as any).hash = "1900e6c65f3b4b7348002a3a8e959710";

export default node;
