/**
 * @generated SignedSource<<93f80cb8b8d1220af948a985689e6304>>
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
      readonly awayCompetitor: string;
      readonly awayScore: number | null | undefined;
      readonly homeCompetitor: string;
      readonly homeScore: number | null | undefined;
      readonly id: string;
      readonly status: EventStatus;
      readonly tradingStatus: TradingStatus;
      readonly " $fragmentSpreads": FragmentRefs<"LiveScore" | "LiveTime">;
    };
    readonly timings: {
      readonly backendEmittedAt: string;
      readonly backendPushedAt: string;
      readonly backendReceivedAt: string;
      readonly feedReceivedAt: string;
      readonly scraperPublishedAt: string | null | undefined;
    } | null | undefined;
    readonly updatedAt: string;
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
  "name": "updatedAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "LiveTimings",
  "kind": "LinkedField",
  "name": "timings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "backendEmittedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "backendPushedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "backendReceivedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "feedReceivedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "scraperPublishedAt",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tradingStatus",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
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
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              (v5/*:: as any*/),
              (v6/*:: as any*/),
              (v7/*:: as any*/),
              (v8/*:: as any*/),
              (v9/*:: as any*/),
              (v10/*:: as any*/),
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
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              (v5/*:: as any*/),
              (v6/*:: as any*/),
              (v7/*:: as any*/),
              (v8/*:: as any*/),
              (v9/*:: as any*/),
              (v10/*:: as any*/),
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
                "name": "clockDirection",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveSeenAt",
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
    "cacheID": "005a15f3f3b2e60a986802df70d8f15b",
    "id": null,
    "metadata": {},
    "name": "LiveStateSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveStateSubscription(\n  $eventIds: [ID!]!\n) {\n  eventStateUpdated(eventIds: $eventIds) {\n    updatedAt\n    timings {\n      backendEmittedAt\n      backendPushedAt\n      backendReceivedAt\n      feedReceivedAt\n      scraperPublishedAt\n    }\n    event {\n      id\n      status\n      tradingStatus\n      homeCompetitor\n      awayCompetitor\n      homeScore\n      awayScore\n      ...LiveScore\n      ...LiveTime\n    }\n  }\n}\n\nfragment LiveScore on Event {\n  homeScore\n  awayScore\n}\n\nfragment LiveTime on Event {\n  id\n  status\n  period\n  clockRunning\n  clockDirection\n  clockElapsedSeconds\n  clockAnchorAt\n  liveSeenAt\n  tradingStatus\n}\n"
  }
};
})();

(node as any).hash = "2562cc7e8560470322e8b482d349fb80";

export default node;
