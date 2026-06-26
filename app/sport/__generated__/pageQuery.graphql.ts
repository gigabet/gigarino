/**
 * @generated SignedSource<<581e4a7253f1ca3be511b4f52124c3e5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery$variables = Record<PropertyKey, never>;
export type pageQuery$data = {
  readonly mainContent: string;
  readonly " $fragmentSpreads": FragmentRefs<"SideContent_" | "StreamContent_">;
};
export type pageQuery = {
  response: pageQuery$data;
  variables: pageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mainContent",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageQuery",
    "selections": [
      (v0/*:: as any*/),
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageQuery",
    "selections": [
      (v0/*:: as any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
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
      }
    ]
  },
  "params": {
    "cacheID": "a4a1cc0ec42bbe90845931c7de0d979b",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery {\n  mainContent\n  ...StreamContent_ @defer(label: \"pageQuery$defer$StreamContent_\")\n  ...SideContent_ @defer(label: \"pageQuery$defer$SideContent_\")\n}\n\nfragment SideContent_ on Query {\n  lazyContent\n}\n\nfragment StreamContent_ on Query {\n  streamableContent @stream(label: \"StreamContent_$stream$streamableContent\", initialCount: 0) {\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "8aa832ff02a460eda9db88ad73eaeb5b";

export default node;
