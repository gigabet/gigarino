/**
 * @generated SignedSource<<3cefb328a54f8fc1c5433529f4cc81de>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketRow$data = {
  readonly betType: TicketType;
  readonly createdAt: string;
  readonly currency: string;
  readonly effectiveOdds: any;
  readonly id: string;
  readonly items: ReadonlyArray<{
    readonly eventName: string;
    readonly marketName: string;
    readonly outcomeName: string;
  }>;
  readonly payout: any | null | undefined;
  readonly potentialPayout: any;
  readonly resettled: boolean;
  readonly resettlementSeen: boolean;
  readonly stake: any;
  readonly status: TicketStatus;
  readonly " $fragmentSpreads": FragmentRefs<"TicketCardDetails">;
  readonly " $fragmentType": "TicketRow";
};
export type TicketRow$key = {
  readonly " $data"?: TicketRow$data;
  readonly " $fragmentSpreads": FragmentRefs<"TicketRow">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TicketRow",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
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
      "concreteType": "TicketItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TicketCardDetails"
    }
  ],
  "type": "Ticket",
  "abstractKey": null
};

(node as any).hash = "4c7caabbb7bbdd12c1462644efaf55ca";

export default node;
