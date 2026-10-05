/**
 * @generated SignedSource<<5c2a9c6e975891a69ae060298412b738>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
export type LiveStateSubscription$variables = {
  eventIds: ReadonlyArray<string>;
};
export type LiveStateSubscription$data = {
  readonly eventStateUpdated: {
    readonly event: {
      readonly id: string;
      readonly status: EventStatus;
      readonly tradingStatus: TradingStatus;
      readonly " $fragmentSpreads": FragmentRefs<"LiveScore" | "LiveTime">;
    };
  };
};
export type LiveStateSubscription = {
  response: LiveStateSubscription$data;
  variables: LiveStateSubscription$variables;
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
    "kind": "Variable",
    "name": "eventIds",
    "variableName": "eventIds"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tradingStatus",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveStateSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "EventStateUpdate",
        "kind": "LinkedField",
        "name": "eventStateUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LiveEvent",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LiveScore"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LiveTime"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "LiveStateSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "EventStateUpdate",
        "kind": "LinkedField",
        "name": "eventStateUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LiveEvent",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "homeScore",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "awayScore",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "period",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clockRunning",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clockElapsedSeconds",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clockAnchorAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "769f5978eaee290c6f71448fea59748b",
    "id": null,
    "metadata": {},
    "name": "LiveStateSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveStateSubscription(\n  $eventIds: [ID!]!\n) {\n  eventStateUpdated(eventIds: $eventIds) {\n    event {\n      id\n      status\n      tradingStatus\n      ...LiveScore\n      ...LiveTime\n    }\n  }\n}\n\nfragment LiveScore on LiveEvent {\n  homeScore\n  awayScore\n}\n\nfragment LiveTime on LiveEvent {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n}\n"
  }
};
})();

(node as any).hash = "4afeb654f1bb60e6740a30e24a3d97e3";

export default node;
