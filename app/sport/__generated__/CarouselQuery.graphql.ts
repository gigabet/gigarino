/**
 * @generated SignedSource<<27200ab55b904f60e6cb21b23f1862f7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type FeaturedBetKind = "BET_BOOST" | "COMBO_OF_WEEK" | "FEATURED_GAME" | "%future added value";
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
export type CarouselQuery$variables = Record<PropertyKey, never>;
export type CarouselQuery$data = {
  readonly featuredBets: ReadonlyArray<{
    readonly boostedPrice: any | null | undefined;
    readonly combinedPrice: any | null | undefined;
    readonly id: string;
    readonly kind: FeaturedBetKind;
    readonly maxStake: any | null | undefined;
    readonly selections: ReadonlyArray<{
      readonly available: boolean;
      readonly event: {
        readonly awayCompetitor: string;
        readonly homeCompetitor: string;
        readonly id: string;
        readonly markets: ReadonlyArray<{
          readonly id: string;
          readonly kind: string;
          readonly name: string;
          readonly outcomes: ReadonlyArray<{
            readonly id: string;
            readonly index: number;
            readonly key: string;
            readonly name: string;
            readonly price: any;
            readonly status: OutcomeStatus;
          }>;
        }>;
        readonly sport: {
          readonly key: string;
        };
        readonly startTime: string;
        readonly status: EventStatus;
        readonly tournament: {
          readonly name: string;
        };
      } | null | undefined;
      readonly eventName: string | null | undefined;
      readonly marketName: string | null | undefined;
      readonly outcomeId: string;
      readonly outcomeName: string | null | undefined;
      readonly price: any | null | undefined;
    }>;
    readonly subtitle: string | null | undefined;
    readonly title: string;
    readonly validTo: any | null | undefined;
  }>;
};
export type CarouselQuery = {
  response: CarouselQuery$data;
  variables: CarouselQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtitle",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "combinedPrice",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boostedPrice",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxStake",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validTo",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outcomeId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "marketName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outcomeName",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "available",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "groups",
      "value": [
        "MAIN"
      ]
    }
  ],
  "concreteType": "Market",
  "kind": "LinkedField",
  "name": "markets",
  "plural": true,
  "selections": [
    (v0/*:: as any*/),
    (v1/*:: as any*/),
    (v19/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Outcome",
      "kind": "LinkedField",
      "name": "outcomes",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "index",
          "storageKey": null
        },
        (v19/*:: as any*/),
        (v18/*:: as any*/),
        (v12/*:: as any*/),
        (v17/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "markets(groups:[\"MAIN\"])"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CarouselQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FeaturedBet",
        "kind": "LinkedField",
        "name": "featuredBets",
        "plural": true,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FeaturedBetSelection",
            "kind": "LinkedField",
            "name": "selections",
            "plural": true,
            "selections": [
              (v8/*:: as any*/),
              (v9/*:: as any*/),
              (v10/*:: as any*/),
              (v11/*:: as any*/),
              (v12/*:: as any*/),
              (v13/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PrematchEvent",
                "kind": "LinkedField",
                "name": "event",
                "plural": false,
                "selections": [
                  (v0/*:: as any*/),
                  (v14/*:: as any*/),
                  (v15/*:: as any*/),
                  (v16/*:: as any*/),
                  (v17/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sport",
                    "kind": "LinkedField",
                    "name": "sport",
                    "plural": false,
                    "selections": [
                      (v18/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v19/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CarouselQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FeaturedBet",
        "kind": "LinkedField",
        "name": "featuredBets",
        "plural": true,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FeaturedBetSelection",
            "kind": "LinkedField",
            "name": "selections",
            "plural": true,
            "selections": [
              (v8/*:: as any*/),
              (v9/*:: as any*/),
              (v10/*:: as any*/),
              (v11/*:: as any*/),
              (v12/*:: as any*/),
              (v13/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PrematchEvent",
                "kind": "LinkedField",
                "name": "event",
                "plural": false,
                "selections": [
                  (v0/*:: as any*/),
                  (v14/*:: as any*/),
                  (v15/*:: as any*/),
                  (v16/*:: as any*/),
                  (v17/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sport",
                    "kind": "LinkedField",
                    "name": "sport",
                    "plural": false,
                    "selections": [
                      (v18/*:: as any*/),
                      (v0/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v19/*:: as any*/),
                      (v0/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*:: as any*/)
                ],
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
    "cacheID": "31d06fece68f7dd9c4d2a75358f5c3fb",
    "id": null,
    "metadata": {},
    "name": "CarouselQuery",
    "operationKind": "query",
    "text": "query CarouselQuery {\n  featuredBets {\n    id\n    kind\n    title\n    subtitle\n    combinedPrice\n    boostedPrice\n    maxStake\n    validTo\n    selections {\n      outcomeId\n      eventName\n      marketName\n      outcomeName\n      price\n      available\n      event {\n        id\n        homeCompetitor\n        awayCompetitor\n        startTime\n        status\n        sport {\n          key\n          id\n        }\n        tournament {\n          name\n          id\n        }\n        markets(groups: [MAIN]) {\n          id\n          kind\n          name\n          outcomes {\n            id\n            index\n            name\n            key\n            price\n            status\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "167947f187501d146cb7370dd35f1690";

export default node;
