/**
 * @generated SignedSource<<5d8a7ef6e491ee70c11a77d6f34d3aa7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchLayoutQuery$variables = Record<PropertyKey, never>;
export type PrematchLayoutQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Sidebar">;
};
export type PrematchLayoutQuery = {
  response: PrematchLayoutQuery$data;
  variables: PrematchLayoutQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchLayoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Sidebar"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PrematchLayoutQuery",
    "selections": [
      {
        "if": null,
        "kind": "Stream",
        "label": "Sidebar$stream$sports",
        "selections": [
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
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "655e5e55fa3153d9bc05eb28c4841112",
    "id": null,
    "metadata": {},
    "name": "PrematchLayoutQuery",
    "operationKind": "query",
    "text": "query PrematchLayoutQuery {\n  ...Sidebar\n}\n\nfragment Sidebar on Query {\n  sports @stream(label: \"Sidebar$stream$sports\", initialCount: 4) {\n    key\n    ...SidebarSport\n    id\n  }\n}\n\nfragment SidebarSport on Sport {\n  key\n  name\n}\n"
  }
};

(node as any).hash = "6bec2eee6c5533bda511c16d9448c8a8";

export default node;
