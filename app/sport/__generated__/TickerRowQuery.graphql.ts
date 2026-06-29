/**
 * @generated SignedSource<<b5d316c806f063a02211a3028f8a2714>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TickerRowQuery$variables = {
  from: number;
  itemId: string;
};
export type TickerRowQuery$data = {
  readonly ticker: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TickerRow_ticker">;
  };
};
export type TickerRowQuery = {
  response: TickerRowQuery$data;
  variables: TickerRowQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "from"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "from",
    "variableName": "from"
  },
  {
    "kind": "Variable",
    "name": "itemId",
    "variableName": "itemId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TickerRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "Ticker",
        "kind": "LinkedField",
        "name": "ticker",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TickerRow_ticker"
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "TickerRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "Ticker",
        "kind": "LinkedField",
        "name": "ticker",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "itemId",
            "storageKey": null
          },
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
  "params": {
    "cacheID": "acecd60ea4fbb056f4eabb0bf6b45648",
    "id": null,
    "metadata": {},
    "name": "TickerRowQuery",
    "operationKind": "query",
    "text": "query TickerRowQuery(\n  $itemId: ID!\n  $from: Int!\n) {\n  ticker(itemId: $itemId, from: $from) {\n    id\n    ...TickerRow_ticker\n  }\n}\n\nfragment TickerRow_ticker on Ticker {\n  id\n  itemId\n  value\n}\n"
  }
};
})();

(node as any).hash = "c243df199fd07a3e47f6d0e56d83a308";

export default node;
