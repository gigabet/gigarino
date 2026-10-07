/**
 * @generated SignedSource<<e443a795a3ea0a1bc6d8f1cdba9e147d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSportTabsRefetch$variables = Record<PropertyKey, never>;
export type LiveSportTabsRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"LiveSportTabs">;
};
export type LiveSportTabsRefetch = {
  response: LiveSportTabsRefetch$data;
  variables: LiveSportTabsRefetch$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveSportTabsRefetch",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "LiveSportTabs"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LiveSportTabsRefetch",
    "selections": [
      {
        "alias": "allLive",
        "args": null,
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "sports",
        "plural": true,
        "selections": [
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveEventCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f3ee8cc17e0c8b0ccc7b609c7d24d4a9",
    "id": null,
    "metadata": {},
    "name": "LiveSportTabsRefetch",
    "operationKind": "query",
    "text": "query LiveSportTabsRefetch {\n  ...LiveSportTabs\n}\n\nfragment LiveSportTabs on Query {\n  allLive: liveEvents {\n    totalCount\n  }\n  sports {\n    key\n    name\n    liveEventCount\n    id\n  }\n}\n"
  }
};

(node as any).hash = "12ca01feeeb6c10389af2d2a1aef8d3c";

export default node;
