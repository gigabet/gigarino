/**
 * @generated SignedSource<<b2867a8fda93d57b1723e867e8cc9be7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleViewQuery$variables = {
  id: string;
};
export type PrematchSingleViewQuery$data = {
  readonly event: {
    readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleView">;
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
  "name": "key",
  "storageKey": null
},
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchSingleViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "PrematchEvent",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
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
        "concreteType": "PrematchEvent",
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
            "concreteType": "Sport",
            "kind": "LinkedField",
            "name": "sport",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/)
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
              (v2/*:: as any*/),
              (v4/*:: as any*/),
              (v3/*:: as any*/)
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
              (v4/*:: as any*/),
              (v3/*:: as any*/)
            ],
            "storageKey": null
          },
          (v5/*:: as any*/),
          (v3/*:: as any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tradingStatus",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "homeScore",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "awayScore",
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": "__isEvent"
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "PrematchSingleView$defer$MarketGroups",
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
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
                        "name": "group",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "kind",
                        "storageKey": null
                      },
                      (v4/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "line",
                        "storageKey": null
                      },
                      (v5/*:: as any*/),
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
                    "storageKey": null
                  }
                ],
                "type": "Event",
                "abstractKey": "__isEvent"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e168fe4211e7c0ec0039b68b4125fd18",
    "id": null,
    "metadata": {},
    "name": "PrematchSingleViewQuery",
    "operationKind": "query",
    "text": "query PrematchSingleViewQuery(\n  $id: ID!\n) {\n  event(id: $id) {\n    ...PrematchSingleView\n    id\n  }\n}\n\nfragment EventLiveState on Event {\n  __isEvent: __typename\n  status\n  tradingStatus\n  homeScore\n  awayScore\n}\n\nfragment MarketCard on Market {\n  name\n  line\n  status\n  outcomes {\n    id\n    index\n    name\n    price\n    status\n  }\n}\n\nfragment MarketGroups on Event {\n  __isEvent: __typename\n  markets {\n    id\n    group\n    kind\n    ...MarketCard\n  }\n}\n\nfragment PrematchSingleHeader on PrematchEvent {\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    name\n    id\n  }\n  category {\n    name\n    id\n  }\n  status\n}\n\nfragment PrematchSingleView on PrematchEvent {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...PrematchSingleHeader\n  ...EventLiveState\n  ...MarketGroups @defer(label: \"PrematchSingleView$defer$MarketGroups\")\n}\n"
  }
};
})();

(node as any).hash = "b3fe823bf2197c11825aa83699ea44cf";

export default node;
