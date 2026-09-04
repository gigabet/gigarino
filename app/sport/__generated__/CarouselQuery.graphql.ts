/**
 * @generated SignedSource<<e964721ccc981201d30e05b0baee19b4>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeaturedBetKind = "BET_BOOST" | "COMBO_OF_WEEK" | "FEATURED_GAME" | "%future added value";
export type CarouselQuery$variables = Record<PropertyKey, never>;
export type CarouselQuery$data = {
  readonly featuredBets: ReadonlyArray<{
    readonly id: string;
    readonly kind: FeaturedBetKind;
    readonly " $fragmentSpreads": FragmentRefs<"BetBoostCard_bet" | "ComboOfWeekCard_bet" | "FeaturedGameCard_bet">;
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
  "name": "price",
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
  "name": "key",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BetBoostCard_bet"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ComboOfWeekCard_bet"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeaturedGameCard_bet"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "boostedPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "combinedPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maxStake",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "validTo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FeaturedBetSelection",
            "kind": "LinkedField",
            "name": "selections",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "outcomeId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "outcomeName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "marketName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "eventName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "available",
                "storageKey": null
              },
              (v2/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PrematchEvent",
                "kind": "LinkedField",
                "name": "event",
                "plural": false,
                "selections": [
                  (v0/*:: as any*/),
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
                    "name": "awayCompetitor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startTime",
                    "storageKey": null
                  },
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sport",
                    "kind": "LinkedField",
                    "name": "sport",
                    "plural": false,
                    "selections": [
                      (v4/*:: as any*/),
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
                      (v5/*:: as any*/),
                      (v0/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
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
                          (v5/*:: as any*/),
                          (v4/*:: as any*/),
                          (v2/*:: as any*/),
                          (v3/*:: as any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "markets(groups:[\"MAIN\"])"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "subtitle",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "318f72470f2e999f211cc1deb14e83d3",
    "id": null,
    "metadata": {},
    "name": "CarouselQuery",
    "operationKind": "query",
    "text": "query CarouselQuery {\n  featuredBets {\n    id\n    kind\n    ...BetBoostCard_bet\n    ...ComboOfWeekCard_bet\n    ...FeaturedGameCard_bet\n  }\n}\n\nfragment BetBoostCard_bet on FeaturedBet {\n  boostedPrice\n  combinedPrice\n  maxStake\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    available\n  }\n}\n\nfragment ComboOfWeekCard_bet on FeaturedBet {\n  title\n  subtitle\n  combinedPrice\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    price\n    available\n  }\n}\n\nfragment FeaturedGameCard_bet on FeaturedBet {\n  validTo\n  selections {\n    event {\n      id\n      homeCompetitor\n      awayCompetitor\n      startTime\n      status\n      sport {\n        key\n        id\n      }\n      tournament {\n        name\n        id\n      }\n      markets(groups: [MAIN]) {\n        id\n        kind\n        outcomes {\n          id\n          index\n          name\n          key\n          price\n          status\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0ba35788ddd51ea751a8ed4680100fe";

export default node;
