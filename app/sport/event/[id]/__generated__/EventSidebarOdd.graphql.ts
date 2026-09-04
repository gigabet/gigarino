/**
 * @generated SignedSource<<9680e9e1f280625c2e567ed74fff1f9d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EventSidebarOdd$data = {
  readonly id: string;
  readonly name: string;
  readonly price: any;
  readonly status: OutcomeStatus;
  readonly " $fragmentType": "EventSidebarOdd";
};
export type EventSidebarOdd$key = {
  readonly " $data"?: EventSidebarOdd$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebarOdd">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebarOdd",
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
      "name": "name",
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
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Outcome",
  "abstractKey": null
};

(node as any).hash = "e29cf54402c3b882baa0c7ef657fcdd6";

export default node;
