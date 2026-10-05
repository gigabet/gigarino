/**
 * @generated SignedSource<<095264bcb6b3f301ceadaf3dfaf8bcd5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveHeaderQuery$variables = Record<PropertyKey, never>;
export type LiveHeaderQuery$data = {
  readonly liveEvents: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"LiveOrder">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSportTabs">;
};
export type LiveHeaderQuery = {
  response: LiveHeaderQuery$data;
  variables: LiveHeaderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = [
  (v2/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LiveEvent",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": true,
        "selections": [
          {
            "kind": "InlineDataFragmentSpread",
            "name": "LiveOrder",
            "selections": [
              (v0/*:: as any*/),
              (v1/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sport",
                "kind": "LinkedField",
                "name": "sport",
                "plural": false,
                "selections": (v3/*:: as any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournament",
                "plural": false,
                "selections": (v3/*:: as any*/),
                "storageKey": null
              }
            ],
            "args": null,
            "argumentDefinitions": []
          }
        ],
        "storageKey": null
      },
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
    "name": "LiveHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LiveEvent",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": true,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sport",
            "kind": "LinkedField",
            "name": "sport",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v0/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
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
              (v0/*:: as any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8c25049bb090068a9c51f808ac49ac27",
    "id": null,
    "metadata": {},
    "name": "LiveHeaderQuery",
    "operationKind": "query",
    "text": "query LiveHeaderQuery {\n  liveEvents {\n    ...LiveOrder\n    id\n  }\n  ...LiveSportTabs\n}\n\nfragment LiveOrder on LiveEvent {\n  id\n  startTime\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveSportTabs on Query {\n  liveEvents {\n    sport {\n      key\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "348cb1b1c6a1145b826d1446c95b4442";

export default node;
