/**
 * @generated SignedSource<<52864831926af4f8a1e922530492b2ed>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchQuery$variables = {
  filterActive: boolean;
  tournamentKeys: ReadonlyArray<string>;
};
export type PrematchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};
export type PrematchQuery = {
  response: PrematchQuery$data;
  variables: PrematchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterActive"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tournamentKeys"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
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
  "name": "name",
  "storageKey": null
},
v4 = [
  (v2/*:: as any*/),
  {
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
      (v2/*:: as any*/)
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "countryCode",
        "storageKey": null
      },
      (v2/*:: as any*/)
    ],
    "storageKey": null
  },
  (v3/*:: as any*/),
  {
    "if": null,
    "kind": "Defer",
    "label": "Tournament$defer$TournamentEventList",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
                  (v2/*:: as any*/),
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
                          (v2/*:: as any*/),
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
                              (v2/*:: as any*/),
                              (v3/*:: as any*/),
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
        "storageKey": "events(first:4)"
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchQuery",
    "selections": [
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "PrematchQuery",
    "selections": [
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
                "args": (v1/*:: as any*/),
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "topTournaments",
                "plural": true,
                "selections": (v4/*:: as any*/),
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
                "selections": (v4/*:: as any*/),
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "a1a669a0043a55e0bdbfac97ba2a2a22",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery(\n  $filterActive: Boolean!\n  $tournamentKeys: [ID!]!\n) {\n  ...PrematchList_LEF20\n}\n\nfragment ListViewMarkets on PrematchEvent {\n  markets {\n    id\n    kind\n    ...PrematchMarket\n  }\n}\n\nfragment PrematchEvent on PrematchEvent {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment PrematchList_LEF20 on Query {\n  topTournaments(first: 4) @skip(if: $filterActive) @stream(label: \"PrematchList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  tournaments(ids: $tournamentKeys) @include(if: $filterActive) @stream(label: \"PrematchList$stream$tournaments_eEJ6e\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n}\n\nfragment PrematchMarket on Market {\n  outcomes {\n    id\n    name\n    price\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: 4) {\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2ed81381a07b7da7e73f9b7e1d30cc3";

export default node;
