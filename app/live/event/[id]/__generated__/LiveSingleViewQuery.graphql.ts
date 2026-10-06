/**
 * @generated SignedSource<<25eb441d1045d731590e886ba899cbdc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSingleViewQuery$variables = {
  id: string;
};
export type LiveSingleViewQuery$data = {
  readonly event: {
    readonly " $fragmentSpreads": FragmentRefs<"LiveSingleView">;
  } | null | undefined;
};
export type LiveSingleViewQuery = {
  response: LiveSingleViewQuery$data;
  variables: LiveSingleViewQuery$variables;
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
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveSingleViewQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "LiveSingleView"
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
    "name": "LiveSingleViewQuery",
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
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "LiveSingleView$defer$MarketGroups",
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
                  (v6/*:: as any*/),
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
                      (v6/*:: as any*/),
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
            ]
          },
          (v3/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "13d0f9d6623f37327ef7c9072ff8b05a",
    "id": null,
    "metadata": {},
    "name": "LiveSingleViewQuery",
    "operationKind": "query",
    "text": "query LiveSingleViewQuery(\n  $id: ID!\n) {\n  event(id: $id) {\n    ...LiveSingleView\n    id\n  }\n}\n\nfragment EventState on Event {\n  status\n  tradingStatus\n  homeScore\n  awayScore\n}\n\nfragment LiveSingleHeader on Event {\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    name\n    id\n  }\n  category {\n    name\n    id\n  }\n  status\n}\n\nfragment LiveSingleView on Event {\n  homeCompetitor\n  awayCompetitor\n  startTime\n  ...LiveSingleHeader\n  ...EventState\n  ...MarketGroups @defer(label: \"LiveSingleView$defer$MarketGroups\")\n}\n\nfragment MarketCard on Market {\n  name\n  line\n  status\n  outcomes {\n    id\n    index\n    name\n    price\n    status\n  }\n}\n\nfragment MarketGroups on Event {\n  markets {\n    id\n    groups\n    kind\n    index\n    ...MarketCard\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc451ada2ebe33a7a30cd088a457f082";

export default node;
