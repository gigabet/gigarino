/**
 * @generated SignedSource<<271890de525ab04a609b0c07bee4a4f1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchQuery$variables = Record<PropertyKey, never>;
export type PrematchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};
export type PrematchQuery = {
  response: PrematchQuery$data;
  variables: PrematchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PrematchList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PrematchQuery",
    "selections": [
      {
        "if": null,
        "kind": "Stream",
        "label": "PrematchList$stream$topTournaments_2KSsfl",
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 0
              }
            ],
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v0/*:: as any*/),
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
                  (v0/*:: as any*/)
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
                  (v0/*:: as any*/)
                ],
                "storageKey": null
              },
              (v1/*:: as any*/),
              {
                "if": null,
                "kind": "Defer",
                "label": "Tournament$defer$TournamentEventList",
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 4
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
                              (v0/*:: as any*/),
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
                                "alias": null,
                                "args": null,
                                "concreteType": "Market",
                                "kind": "LinkedField",
                                "name": "markets",
                                "plural": true,
                                "selections": [
                                  (v0/*:: as any*/),
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
                                      (v0/*:: as any*/),
                                      (v1/*:: as any*/),
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
            ],
            "storageKey": "topTournaments(first:0)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "636f06ba745c86ab8455a701f22dd66c",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery {\n  ...PrematchList\n}\n\nfragment ListViewMarkets on PrematchEvent {\n  markets {\n    id\n    kind\n    ...PrematchMarket\n  }\n}\n\nfragment PrematchEvent on PrematchEvent {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...ListViewMarkets\n}\n\nfragment PrematchList on Query {\n  topTournaments(first: 0) @stream(label: \"PrematchList$stream$topTournaments_2KSsfl\", initialCount: 0) {\n    id\n    ...Tournament\n  }\n}\n\nfragment PrematchMarket on Market {\n  outcomes {\n    id\n    name\n    price\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: 4) {\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc8acb17da37daf2111acd3f6002e5ce";

export default node;
