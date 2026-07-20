/**
 * @generated SignedSource<<b4fd36c8a45e058a53af4184a6a8dcb6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchQuery$variables = {
  eventCount: number;
  filterActive: boolean;
  tournamentKeys: ReadonlyArray<string>;
};
export type PrematchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList" | "ShortcutRow">;
};
export type PrematchQuery = {
  response: PrematchQuery$data;
  variables: PrematchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventCount"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filterActive"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tournamentKeys"
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
    (v4/*:: as any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v4/*:: as any*/),
  (v5/*:: as any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "countryCode",
        "storageKey": null
      },
      (v4/*:: as any*/)
    ],
    "storageKey": null
  },
  (v6/*:: as any*/),
  {
    "if": null,
    "kind": "Defer",
    "label": "Tournament$defer$TournamentEventList",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "eventCount"
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
                "concreteType": "PrematchEvent",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*:: as any*/),
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
                  {
                    "if": null,
                    "kind": "Defer",
                    "label": "PrematchEvent$defer$ListViewMarkets",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Market",
                        "kind": "LinkedField",
                        "name": "markets",
                        "plural": true,
                        "selections": [
                          (v4/*:: as any*/),
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
                              (v4/*:: as any*/),
                              (v6/*:: as any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "price",
                                "storageKey": null
                              }
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ShortcutRow"
      },
      {
        "args": [
          {
            "kind": "Variable",
            "name": "filterActive",
            "variableName": "filterActive"
          },
          {
            "kind": "Variable",
            "name": "tournamentKeys",
            "variableName": "tournamentKeys"
          }
        ],
        "kind": "FragmentSpread",
        "name": "PrematchList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "PrematchQuery",
    "selections": [
      {
        "if": null,
        "kind": "Stream",
        "label": "ShortcutRow$stream$scr_topTournaments_3z2gQm",
        "selections": [
          {
            "alias": "scr_topTournaments",
            "args": (v3/*:: as any*/),
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v5/*:: as any*/),
              (v4/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "storageKey": "topTournaments(first:4)"
          }
        ]
      },
      {
        "condition": "filterActive",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "PrematchList$stream$topTournaments_3z2gQm",
            "selections": [
              {
                "alias": null,
                "args": (v3/*:: as any*/),
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "topTournaments",
                "plural": true,
                "selections": (v7/*:: as any*/),
                "storageKey": "topTournaments(first:4)"
              }
            ]
          }
        ]
      },
      {
        "condition": "filterActive",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "PrematchList$stream$tournaments_eEJ6e",
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "ids",
                    "variableName": "tournamentKeys"
                  }
                ],
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournaments",
                "plural": true,
                "selections": (v7/*:: as any*/),
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "8e37a9de05e3fac8bc310808d57b01e3",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery(\n  $filterActive: Boolean!\n  $tournamentKeys: [ID!]!\n  $eventCount: Int!\n) {\n  ...ShortcutRow\n  ...PrematchList_LEF20\n}\n\nfragment ListViewMarkets on PrematchEvent {\n  markets {\n    id\n    kind\n    ...PrematchMarket\n  }\n}\n\nfragment PrematchEvent on PrematchEvent {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment PrematchList_LEF20 on Query {\n  topTournaments(first: 4) @skip(if: $filterActive) @stream(label: \"PrematchList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  tournaments(ids: $tournamentKeys) @include(if: $filterActive) @stream(label: \"PrematchList$stream$tournaments_eEJ6e\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n}\n\nfragment PrematchMarket on Market {\n  outcomes {\n    id\n    name\n    price\n  }\n}\n\nfragment ShortcutRow on Query {\n  scr_topTournaments: topTournaments(first: 4) @stream(label: \"ShortcutRow$stream$scr_topTournaments_3z2gQm\", initialCount: 1) {\n    sport {\n      key\n      id\n    }\n    id\n    name\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: $eventCount) {\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "36ae6ff4f9a228e81ce4e2166df8f246";

export default node;
