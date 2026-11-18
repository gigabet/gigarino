/**
 * @generated SignedSource<<00587c004c8c3fda477488a900f1b8a8>>
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
    }
  ],
  "type": "Ticket",
  "abstractKey": null
};

(node as any).hash = "fa8283800308eca0fb5b9401ea4145e5";

export default node;
