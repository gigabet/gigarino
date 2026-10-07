/**
 * @generated SignedSource<<9baa3b04765d7b4ba43ffcf78cf0706c>>
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
        "alias": null,
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
    "cacheID": "bd12e2a19592153649902e28c181a457",
    "id": null,
    "metadata": {},
    "name": "LiveSportTabsRefetch",
    "operationKind": "query",
    "text": "query LiveSportTabsRefetch {\n  ...LiveSportTabs\n}\n\nfragment LiveSportTabs on Query {\n  liveEvents {\n    totalCount\n  }\n  sports {\n    key\n    name\n    liveEventCount\n    id\n  }\n}\n"
  }
};

(node as any).hash = "351e17778caa20d2d118cc3b0947cfd5";

export default node;
