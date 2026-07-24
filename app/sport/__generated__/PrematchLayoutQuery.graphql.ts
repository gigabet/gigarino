/**
 * @generated SignedSource<<508979fe226ed9a95203863c068d3b35>>
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

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventCount",
  "storageKey": null
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
              (v0/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*:: as any*/)
            ],
            "storageKey": null
          }
        ]
      },
      {
        "if": null,
        "kind": "Stream",
        "label": "Sidebar$stream$sb_topTournaments_3z2gQm",
        "selections": [
          {
            "alias": "sb_topTournaments",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 4
              }
            ],
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v0/*:: as any*/),
              (v1/*:: as any*/)
            ],
            "storageKey": "topTournaments(first:4)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "318da7df5061656c3bc6b86191d82c41",
    "id": null,
    "metadata": {},
    "name": "PrematchLayoutQuery",
    "operationKind": "query",
    "text": "query PrematchLayoutQuery {\n  ...Sidebar\n}\n\nfragment Sidebar on Query {\n  sports @stream(label: \"Sidebar$stream$sports\", initialCount: 4) {\n    key\n    eventCount\n    ...SidebarSport\n    id\n  }\n  sb_topTournaments: topTournaments(first: 4) @stream(label: \"Sidebar$stream$sb_topTournaments_3z2gQm\", initialCount: 1) {\n    eventCount\n    id\n  }\n}\n\nfragment SidebarSport on Sport {\n  key\n  name\n  eventCount\n}\n"
  }
};
})();

(node as any).hash = "6bec2eee6c5533bda511c16d9448c8a8";

export default node;
