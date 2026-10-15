/**
 * @generated SignedSource<<a515212582ad4a2c0321e89de32557a7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
export type LiveOddsSubscription$variables = {
  eventIds: ReadonlyArray<string>;
};
export type LiveOddsSubscription$data = {
  readonly oddsUpdated: {
    readonly outcomes: ReadonlyArray<{
      readonly id: string;
      readonly price: any;
      readonly status: OutcomeStatus;
    }>;
  };
};
export type LiveOddsSubscription = {
  response: LiveOddsSubscription$data;
  variables: LiveOddsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventIds",
        "variableName": "eventIds"
      }
    ],
    "concreteType": "OddsUpdate",
    "kind": "LinkedField",
    "name": "oddsUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Outcome",
        "kind": "LinkedField",
        "name": "outcomes",
        "plural": true,
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
            "name": "price",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
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
    "name": "LiveOddsSubscription",
    "selections": (v1/*:: as any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "LiveOddsSubscription",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "f19dd40e264bbc733df9a25456e63e0f",
    "id": null,
    "metadata": {},
    "name": "LiveOddsSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveOddsSubscription(\n  $eventIds: [ID!]!\n) {\n  oddsUpdated(eventIds: $eventIds) {\n    outcomes {\n      id\n      price\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff0e8135bea2f3d71eb14aeea734477d";

export default node;
