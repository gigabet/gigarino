/**
 * @generated SignedSource<<e5370a25724ff76a4cbb8947ff410f5c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LiveEventSubscription$variables = {
  eventId: string;
};
export type LiveEventSubscription$data = {
  readonly eventOdds: {
    readonly away: number;
    readonly draw: number;
    readonly home: number;
    readonly id: string;
  };
};
export type LiveEventSubscription = {
  response: LiveEventSubscription$data;
  variables: LiveEventSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "Odds",
    "kind": "LinkedField",
    "name": "eventOdds",
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
        "name": "home",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "draw",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "away",
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
    "name": "LiveEventSubscription",
    "selections": (v1/*:: as any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "LiveEventSubscription",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "42b835566b5857b85f960667fd8d79a9",
    "id": null,
    "metadata": {},
    "name": "LiveEventSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveEventSubscription(\n  $eventId: ID!\n) {\n  eventOdds(eventId: $eventId) {\n    id\n    home\n    draw\n    away\n  }\n}\n"
  }
};
})();

(node as any).hash = "d64eb59b52c45ec0237f318c082bab82";

export default node;
