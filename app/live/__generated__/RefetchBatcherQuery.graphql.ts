/**
 * @generated SignedSource<<3171de6ed369ff88854f15575b0cd153>>
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
    readonly " $fragmentSpreads": FragmentRefs<"LiveEvent">;
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
};
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
        "concreteType": null,
        "kind": "LinkedField",
        "name": "eventsByIds",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LiveEvent"
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
        "concreteType": null,
        "kind": "LinkedField",
        "name": "eventsByIds",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*:: as any*/),
          {
            "kind": "InlineFragment",
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "key",
                            "storageKey": null
                          },
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
                "type": "Event",
                "abstractKey": "__isEvent"
              }
            ],
            "type": "LiveEvent",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "79ab4d0067e0a01c156236ff4ef74ebf",
    "id": null,
    "metadata": {},
    "name": "RefetchBatcherQuery",
    "operationKind": "query",
    "text": "query RefetchBatcherQuery(\n  $ids: [ID!]!\n) {\n  eventsByIds(ids: $ids) {\n    __typename\n    ...LiveEvent\n    id\n  }\n}\n\nfragment ListViewMarket on Market {\n  outcomes {\n    id\n    index\n    name\n    key\n    price\n  }\n}\n\nfragment ListViewMarkets on Event {\n  __isEvent: __typename\n  markets {\n    id\n    kind\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on LiveEvent {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n}\n\nfragment LiveScore on LiveEvent {\n  homeScore\n  awayScore\n}\n\nfragment LiveTeams on LiveEvent {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on LiveEvent {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n}\n"
  }
};
})();

(node as any).hash = "f5a9b808f601041f743eec2264359357";

export default node;
