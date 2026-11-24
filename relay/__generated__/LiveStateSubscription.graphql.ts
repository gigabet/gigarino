/**
 * @generated SignedSource<<9b53ccef90b934e17d9f9162a1d9fdf3>>
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
      readonly " $fragmentSpreads": FragmentRefs<"LiveScore" | "LiveTeams" | "LiveTime">;
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
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
},
v7 = [
  (v5/*:: as any*/),
  (v6/*:: as any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "period",
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
            "concreteType": "Event",
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
                "name": "LiveTeams"
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
            "concreteType": "Event",
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
                "concreteType": "Sport",
                "kind": "LinkedField",
                "name": "sport",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
                  (v2/*:: as any*/)
                ],
                "storageKey": null
              },
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
                "name": "serving",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PointScore",
                "kind": "LinkedField",
                "name": "pointScore",
                "plural": false,
                "selections": (v7/*:: as any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PeriodScore",
                "kind": "LinkedField",
                "name": "periodScores",
                "plural": true,
                "selections": [
                  (v8/*:: as any*/),
                  (v5/*:: as any*/),
                  (v6/*:: as any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "homeCompetitor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "homeImageUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "awayCompetitor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "awayImageUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "RedCards",
                "kind": "LinkedField",
                "name": "redCards",
                "plural": false,
                "selections": (v7/*:: as any*/),
                "storageKey": null
              },
              (v8/*:: as any*/),
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
    "cacheID": "4071480000c3c8161e812c9cdf378a25",
    "id": null,
    "metadata": {},
    "name": "LiveStateSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveStateSubscription(\n  $eventIds: [ID!]!\n) {\n  eventStateUpdated(eventIds: $eventIds) {\n    event {\n      id\n      status\n      tradingStatus\n      ...LiveScore\n      ...LiveTeams\n      ...LiveTime\n    }\n  }\n}\n\nfragment LiveScore on Event {\n  status\n  sport {\n    key\n    id\n  }\n  homeScore\n  awayScore\n  serving\n  pointScore {\n    home\n    away\n  }\n  periodScores {\n    period\n    home\n    away\n  }\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n  redCards {\n    home\n    away\n  }\n}\n\nfragment LiveTime on Event {\n  id\n  status\n  period\n  clockRunning\n  clockDirection\n  clockElapsedSeconds\n  clockAnchorAt\n  liveSeenAt\n  tradingStatus\n}\n"
  }
};
})();

(node as any).hash = "21f76cfc5fc03579ecd469b25171099c";

export default node;
