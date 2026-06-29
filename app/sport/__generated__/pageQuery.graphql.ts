/**
 * @generated SignedSource<<c4374789aad8c73a925e56bc57882baf>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery$variables = {
  from: number;
};
export type pageQuery$data = {
  readonly countdown: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"CountdownTick_tick">;
  };
  readonly mainContent: string;
  readonly " $fragmentSpreads": FragmentRefs<"SideContent_" | "StreamContent_">;
};
export type pageQuery = {
  response: pageQuery$data;
  variables: pageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "from"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mainContent",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "from",
    "variableName": "from"
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
  "name": "value",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageQuery",
    "selections": [
      (v1/*:: as any*/),
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StreamContent_"
          }
        ]
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SideContent_"
          }
        ]
      },
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "CountdownTick",
        "kind": "LinkedField",
        "name": "countdown",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CountdownTick_tick"
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
    "name": "pageQuery",
    "selections": [
      (v1/*:: as any*/),
      {
        "if": null,
        "kind": "Defer",
        "label": "pageQuery$defer$StreamContent_",
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "StreamContent_$stream$streamableContent",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "WrappedString",
                "kind": "LinkedField",
                "name": "streamableContent",
                "plural": true,
                "selections": [
                  (v4/*:: as any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "pageQuery$defer$SideContent_",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lazyContent",
            "storageKey": null
          }
        ]
      },
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "CountdownTick",
        "kind": "LinkedField",
        "name": "countdown",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94fa582c89cabe7d7808d69effa0c0fb",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery(\n  $from: Int!\n) {\n  mainContent\n  ...StreamContent_ @defer(label: \"pageQuery$defer$StreamContent_\")\n  ...SideContent_ @defer(label: \"pageQuery$defer$SideContent_\")\n  countdown(from: $from) {\n    id\n    ...CountdownTick_tick\n  }\n}\n\nfragment CountdownTick_tick on CountdownTick {\n  id\n  value\n}\n\nfragment SideContent_ on Query {\n  lazyContent\n}\n\nfragment StreamContent_ on Query {\n  streamableContent @stream(label: \"StreamContent_$stream$streamableContent\", initialCount: 0) {\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "2470845de7a4db078afed4eb4168b6ca";

export default node;
