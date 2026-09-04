/**
 * @generated SignedSource<<7e323e420cd2204954b155cfaa52e0db>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeaturedGameCard_bet$data = {
  readonly selections: ReadonlyArray<{
    readonly event: {
      readonly awayCompetitor: string;
      readonly homeCompetitor: string;
      readonly id: string;
      readonly markets: ReadonlyArray<{
        readonly id: string;
        readonly kind: string;
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
  }>;
  readonly validTo: any | null | undefined;
  readonly " $fragmentType": "FeaturedGameCard_bet";
};
export type FeaturedGameCard_bet$key = {
  readonly " $data"?: FeaturedGameCard_bet$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedGameCard_bet">;
};

const node: ReaderFragment = (function(){
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
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeaturedGameCard_bet",
  "selections": [
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
            (v1/*:: as any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Sport",
              "kind": "LinkedField",
              "name": "sport",
              "plural": false,
              "selections": [
                (v2/*:: as any*/)
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
                (v3/*:: as any*/)
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "kind",
                  "storageKey": null
                },
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
                    (v3/*:: as any*/),
                    (v2/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "price",
                      "storageKey": null
                    },
                    (v1/*:: as any*/)
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
    }
  ],
  "type": "FeaturedBet",
  "abstractKey": null
};
})();

(node as any).hash = "50d9b91d90db3ddd36fc1244b70280dd";

export default node;
