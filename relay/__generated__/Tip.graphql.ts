/**
 * @generated SignedSource<<87f96eb9019033c989cd669390953c70>>
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
  readonly eventId: string | null | undefined;
  readonly eventName: string | null | undefined;
  readonly expectedPrice: any | null | undefined;
  readonly isLive: boolean;
  readonly key: string;
  readonly marketName: string | null | undefined;
  readonly name: string | null | undefined;
  readonly outcomeId: string;
  readonly price: any | null | undefined;
  readonly priceChanged: boolean;
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
      "name": "name",
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
      "name": "expectedPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceChanged",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availability",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eventId",
      "storageKey": null
    }
  ],
  "type": "BetslipQuoteItem",
  "abstractKey": null
};

(node as any).hash = "a23cfa09360e984f4d5e50df5bf094d5";

export default node;
