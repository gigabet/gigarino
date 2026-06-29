/**
 * @generated SignedSource<<965046042d552008f8eb9a3c4688b99c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TickerRowSubscription$variables = {
  from: number;
  itemId: string;
};
export type TickerRowSubscription$data = {
  readonly ticker: {
    readonly id: string;
    readonly itemId: string;
    readonly value: number;
  };
};
export type TickerRowSubscription = {
  response: TickerRowSubscription$data;
  variables: TickerRowSubscription$variables;
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
    "alias": null,
    "args": [
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
    "concreteType": "Ticker",
    "kind": "LinkedField",
    "name": "ticker",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TickerRowSubscription",
    "selections": (v2/*:: as any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "TickerRowSubscription",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "169b2ef4d2bd5276d9173f2f9f1229db",
    "id": null,
    "metadata": {},
    "name": "TickerRowSubscription",
    "operationKind": "subscription",
    "text": "subscription TickerRowSubscription(\n  $itemId: ID!\n  $from: Int!\n) {\n  ticker(itemId: $itemId, from: $from) {\n    id\n    itemId\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "885bcf702657bc274cf4c426edcf150a";

export default node;
