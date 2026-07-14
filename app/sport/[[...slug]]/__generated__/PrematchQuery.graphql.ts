/**
 * @generated SignedSource<<a56c1a850638ffa34d7fba8f58977fc3>>
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
  "kind": "Literal",
  "name": "first",
  "value": 4
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
        "label": "PrematchList$stream$topTournaments_2Fm2Kc",
        "selections": [
          {
            "alias": null,
            "args": [
              (v0/*:: as any*/),
              {
                "kind": "Literal",
                "name": "sport",
                "value": "football"
              }
            ],
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "if": null,
                "kind": "Defer",
                "label": "Tournament$defer$TournamentEventList",
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      (v0/*:: as any*/)
                    ],
                    "concreteType": "EventConnection",
                    "kind": "LinkedField",
                    "name": "events",
                    "plural": false,
                    "selections": [
                      {
                        "if": null,
                        "kind": "Stream",
                        "label": "TournamentEventList$stream$edges",
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
                                  (v1/*:: as any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": "events(first:4)"
                  }
                ]
              }
            ],
            "storageKey": "topTournaments(first:4,sport:\"football\")"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fcf10e39a619482c61b376b1c025aa86",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery {\n  ...PrematchList\n}\n\nfragment PrematchList on Query {\n  topTournaments(first: 4, sport: \"football\") @stream(label: \"PrematchList$stream$topTournaments_2Fm2Kc\", initialCount: 0) {\n    id\n    ...Tournament\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: 4) {\n    edges @stream(label: \"TournamentEventList$stream$edges\", initialCount: 0) {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc8acb17da37daf2111acd3f6002e5ce";

export default node;
