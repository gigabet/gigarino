/**
 * @generated SignedSource<<a8e75ef0a3dc57ca76bee32da53c1028>>
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
        "args": null,
        "kind": "FragmentSpread",
        "name": "StreamContent_"
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
    "cacheID": "4978e87f5f5cb89313dc1e2e6a1bfbd8",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery {\n  mainContent\n  ...StreamContent_\n  ...SideContent_ @defer(label: \"pageQuery$defer$SideContent_\")\n}\n\nfragment SideContent_ on Query {\n  lazyContent\n}\n\nfragment StreamContent_ on Query {\n  streamableContent @stream(label: \"StreamContent_$stream$streamableContent\", initialCount: 1) {\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d1aa1bd4013398a1da19b29e645d499";

export default node;
