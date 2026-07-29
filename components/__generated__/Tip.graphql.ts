/**
 * @generated SignedSource<<2d7d4aad8bcbc1ddf1c8bad8439f05ff>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Tip$data = {
  readonly availability: BetslipItemAvailability;
  readonly eventName: string | null | undefined;
  readonly key: string;
  readonly marketName: string | null | undefined;
  readonly outcomeId: string;
  readonly price: any | null | undefined;
  readonly " $fragmentType": "Tip";
};
export type Tip$key = {
  readonly " $data"?: Tip$data;
  readonly " $fragmentSpreads": FragmentRefs<"Tip">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Tip",
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
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availability",
      "storageKey": null
    }
  ],
  "type": "BetslipQuoteItem",
  "abstractKey": null
};

(node as any).hash = "25838b82828d3ed3992523b52441966e";

export default node;
