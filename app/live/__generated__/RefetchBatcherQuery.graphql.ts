/**
 * @generated SignedSource<<ba4eef12e73192a4eb07f08f3e9a6d67>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RefetchBatcherQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type RefetchBatcherQuery$data = {
  readonly eventsByIds: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"LiveEvent" | "LiveOrder">;
  }>;
};
export type RefetchBatcherQuery = {
  response: RefetchBatcherQuery$data;
  variables: RefetchBatcherQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "ids"
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
  "name": "startTime",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v6 = [
  (v5/*:: as any*/)
],
v7 = [
  (v5/*:: as any*/),
  (v2/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefetchBatcherQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventsByIds",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LiveEvent"
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "LiveOrder",
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sport",
                "kind": "LinkedField",
                "name": "sport",
                "plural": false,
                "selections": (v6/*:: as any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournament",
                "plural": false,
                "selections": (v6/*:: as any*/),
                "storageKey": null
              }
            ],
            "args": null,
            "argumentDefinitions": []
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
    "name": "RefetchBatcherQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventsByIds",
        "plural": true,
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
            "name": "oddCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "period",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockRunning",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockElapsedSeconds",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockAnchorAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "homeImageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awayImageUrl",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "index",
                    "storageKey": null
                  },
                  (v5/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  },
                  (v4/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sport",
            "kind": "LinkedField",
            "name": "sport",
            "plural": false,
            "selections": (v7/*:: as any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": (v7/*:: as any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f7ed966708776147d558a74cbce6fca",
    "id": null,
    "metadata": {},
    "name": "RefetchBatcherQuery",
    "operationKind": "query",
    "text": "query RefetchBatcherQuery(\n  $ids: [ID!]!\n) {\n  eventsByIds(ids: $ids) {\n    ...LiveEvent\n    ...LiveOrder\n    id\n  }\n}\n\nfragment ListViewMarket on Market {\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  markets {\n    id\n    kind\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on Event {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n}\n\nfragment LiveOrder on Event {\n  id\n  startTime\n  status\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on Event {\n  homeScore\n  awayScore\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on Event {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n}\n"
  }
};
})();

(node as any).hash = "9ac8631e1ceaae8837582f854ec984d6";

export default node;
