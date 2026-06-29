/**
 * @generated SignedSource<<f8d1724d64512438a7ec46f2ab645a2a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CountdownSubscription$variables = {
  from: number;
};
export type CountdownSubscription$data = {
  readonly countdown: {
    readonly id: string;
    readonly value: number;
  };
};
export type CountdownSubscription = {
  response: CountdownSubscription$data;
  variables: CountdownSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "from"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "from",
        "variableName": "from"
      }
    ],
    "concreteType": "CountdownTick",
    "kind": "LinkedField",
    "name": "countdown",
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
        "name": "value",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CountdownSubscription",
    "selections": (v1/*:: as any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "CountdownSubscription",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "4440aef427b5e08b70148f23191cab32",
    "id": null,
    "metadata": {},
    "name": "CountdownSubscription",
    "operationKind": "subscription",
    "text": "subscription CountdownSubscription(\n  $from: Int!\n) {\n  countdown(from: $from) {\n    id\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "46136c29942a9625145875b939403de0";

export default node;
