/**
 * @generated SignedSource<<c0f9e93aba4fd8cfc1822ff3366d56fd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetItemStatus = "HALF_LOST" | "HALF_WON" | "LOST" | "PENDING" | "PUSH" | "VOID" | "WON" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketCard$data = {
  readonly betType: TicketType;
  readonly createdAt: string;
  readonly currency: string;
  readonly effectiveOdds: any;
  readonly id: string;
  readonly items: ReadonlyArray<{
    readonly eventName: string;
    readonly id: string;
    readonly marketName: string;
    readonly outcomeName: string;
    readonly priceAtAcceptance: any;
    readonly status: BetItemStatus;
  }>;
  readonly potentialPayout: any;
  readonly settledAt: string | null | undefined;
  readonly stake: any;
  readonly status: TicketStatus;
  readonly " $fragmentType": "TicketCard";
};
export type TicketCard$key = {
  readonly " $data"?: TicketCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"TicketCard">;
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TicketCard",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "betType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stake",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "effectiveOdds",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "potentialPayout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    (v1/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "settledAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TicketItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
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
          "name": "marketName",
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
          "name": "priceAtAcceptance",
          "storageKey": null
        },
        (v1/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Ticket",
  "abstractKey": null
};
})();

(node as any).hash = "85f2d99ee954d1616df94979e24a1792";

export default node;
