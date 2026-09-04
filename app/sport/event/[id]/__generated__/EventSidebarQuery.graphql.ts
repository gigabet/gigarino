/**
 * @generated SignedSource<<1414f6bfe664ffe8b0fa810e799752c5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarQuery$variables = {
  first: number;
  id: string;
};
export type EventSidebarQuery$data = {
  readonly event: {
    readonly id: string;
    readonly tournament: {
      readonly " $fragmentSpreads": FragmentRefs<"EventSidebarTournament">;
    };
  } | null | undefined;
};
export type EventSidebarQuery = {
  response: EventSidebarQuery$data;
  variables: EventSidebarQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
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
    "name": "EventSidebarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "PrematchEvent",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EventSidebarTournament"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "EventSidebarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "PrematchEvent",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v3/*:: as any*/),
              (v4/*:: as any*/),
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
                  (v3/*:: as any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "first"
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
                          (v3/*:: as any*/),
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
                          (v5/*:: as any*/),
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
                              (v3/*:: as any*/),
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
                                  (v3/*:: as any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "index",
                                    "storageKey": null
                                  },
                                  (v4/*:: as any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "price",
                                    "storageKey": null
                                  },
                                  (v5/*:: as any*/)
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
    "cacheID": "40062999246007b00a1d098bd41961ff",
    "id": null,
    "metadata": {},
    "name": "EventSidebarQuery",
    "operationKind": "query",
    "text": "query EventSidebarQuery(\n  $id: ID!\n  $first: Int!\n) {\n  event(id: $id) {\n    id\n    tournament {\n      ...EventSidebarTournament\n      id\n    }\n  }\n}\n\nfragment EventSidebarMarket on Market {\n  id\n  kind\n  outcomes {\n    id\n    index\n    ...EventSidebarOdd\n  }\n}\n\nfragment EventSidebarOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment EventSidebarTournament on Tournament {\n  id\n  name\n  sport {\n    key\n    id\n  }\n  events(first: $first) {\n    edges {\n      node {\n        id\n        ...EventStripCard\n      }\n    }\n  }\n}\n\nfragment EventStripCard on PrematchEvent {\n  id\n  homeCompetitor\n  awayCompetitor\n  startTime\n  status\n  markets(groups: [MAIN]) {\n    id\n    kind\n    ...EventSidebarMarket\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4d340cfb306e5f16c299ee885218c27";

export default node;
