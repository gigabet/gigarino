/**
 * @generated SignedSource<<86be56eaf1bfb0fbb9ea948a3276ba11>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketHistoryDetails$data = {
  readonly betType: TicketType;
  readonly createdAt: string;
  readonly currency: string;
  readonly id: string;
  readonly items: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly resettled: boolean;
  readonly resettlementSeen: boolean;
  readonly stake: any;
  readonly status: TicketStatus;
  readonly " $fragmentSpreads": FragmentRefs<"TicketCardDetails">;
  readonly " $fragmentType": "TicketHistoryDetails";
};
export type TicketHistoryDetails$key = {
  readonly " $data"?: TicketHistoryDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"TicketHistoryDetails">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TicketHistoryDetails",
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
      "name": "status",
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
      "name": "currency",
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
        (v0/*:: as any*/)
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
})();

(node as any).hash = "6880d7033e1137b50188c1736ee581c3";

export default node;
