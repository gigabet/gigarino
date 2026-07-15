/**
 * @generated SignedSource<<4a3699fca9c187249c92134e41c40713>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchListRefetch$variables = Record<PropertyKey, never>;
export type PrematchListRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};
export type PrematchListRefetch = {
  response: PrematchListRefetch$data;
  variables: PrematchListRefetch$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
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
    "name": "PrematchListRefetch",
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
    "name": "PrematchListRefetch",
    "selections": [
      {
        "if": null,
        "kind": "Stream",
        "label": "PrematchList$stream$topTournaments_3z2gQm",
        "selections": [
          {
            "alias": null,
            "args": (v0/*:: as any*/),
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v1/*:: as any*/),
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
                  (v1/*:: as any*/)
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
                  (v1/*:: as any*/)
                ],
                "storageKey": null
              },
              (v2/*:: as any*/),
              {
                "if": null,
                "kind": "Defer",
                "label": "Tournament$defer$TournamentEventList",
                "selections": [
                  {
                    "alias": null,
                    "args": (v0/*:: as any*/),
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
                              (v1/*:: as any*/),
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
                                  (v1/*:: as any*/),
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
                                      (v1/*:: as any*/),
                                      (v2/*:: as any*/),
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
            "storageKey": "topTournaments(first:4)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "43a9636b1b8aeeab47e38e4159fbd386",
    "id": null,
    "metadata": {},
    "name": "PrematchListRefetch",
    "operationKind": "query",
    "text": "query PrematchListRefetch {\n  ...PrematchList\n}\n\nfragment ListViewMarkets on PrematchEvent {\n  markets {\n    id\n    kind\n    ...PrematchMarket\n  }\n}\n\nfragment PrematchEvent on PrematchEvent {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...ListViewMarkets\n}\n\nfragment PrematchList on Query {\n  topTournaments(first: 4) @stream(label: \"PrematchList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n}\n\nfragment PrematchMarket on Market {\n  outcomes {\n    id\n    name\n    price\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: 4) {\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "69037aef10da82543cefe65eb351084f";

export default node;
