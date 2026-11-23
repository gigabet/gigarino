/**
 * @generated SignedSource<<bb4c6387d2a03ad74d3daa18f2ca8221>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BetTypeTabs$data = {
  readonly betType: TicketType;
  readonly items: ReadonlyArray<{
    readonly outcomeId: string;
  }>;
  readonly " $fragmentType": "BetTypeTabs";
};
export type BetTypeTabs$key = {
  readonly " $data"?: BetTypeTabs$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetTypeTabs">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetTypeTabs",
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
      "concreteType": "BetslipQuoteItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "outcomeId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "baf18aba08cb03f842ff9af5de4602a8";

export default node;
