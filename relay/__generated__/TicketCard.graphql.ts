/**
 * @generated SignedSource<<3f92434f7472ff88d5cfd34c5d2a0ea3>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetItemStatus = "HALF_LOST" | "HALF_WON" | "LOST" | "PENDING" | "PUSH" | "VOID" | "WON" | "%future added value";
export type CorrectionKind = "PALPABLE_ERROR" | "RESULT_CORRECTION" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketCard$data = {
  readonly betType: TicketType;
  readonly corrections: ReadonlyArray<{
    readonly amount: any;
    readonly createdAt: string;
    readonly id: string;
    readonly itemId: string;
    readonly kind: CorrectionKind;
    readonly newPrice: any;
    readonly newStatus: BetItemStatus;
    readonly previousPrice: any;
    readonly previousStatus: BetItemStatus;
  }>;
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
  readonly payout: any | null | undefined;
  readonly potentialPayout: any;
  readonly resettled: boolean;
  readonly resettlementSeen: boolean;
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
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
      "name": "payout",
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
    (v2/*:: as any*/),
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
      "kind": "ScalarField",
      "name": "resettled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "resettlementSeen",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TicketCorrection",
      "kind": "LinkedField",
      "name": "corrections",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "itemId",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "previousPrice",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "newPrice",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "previousStatus",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "newStatus",
          "storageKey": null
        },
        (v2/*:: as any*/)
      ],
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

(node as any).hash = "88e49c433b7d85a4322c4759ace70bf1";

export default node;
