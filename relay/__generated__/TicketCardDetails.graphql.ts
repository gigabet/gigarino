/**
 * @generated SignedSource<<13d38183df88bb025c23bbd9f6ae2b35>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetItemStatus = "HALF_LOST" | "HALF_WON" | "LOST" | "PENDING" | "PUSH" | "VOID" | "WON" | "%future added value";
export type CorrectionKind = "PALPABLE_ERROR" | "RESULT_CORRECTION" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketCardDetails$data = {
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
  readonly settledAt: string | null | undefined;
  readonly status: TicketStatus;
  readonly " $fragmentType": "TicketCardDetails";
};
export type TicketCardDetails$key = {
  readonly " $data"?: TicketCardDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"TicketCardDetails">;
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
  "name": "TicketCardDetails",
  "selections": [
    (v0/*:: as any*/),
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        }
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

(node as any).hash = "90593af3d037eaa4b583e8d4bf019d10";

export default node;
