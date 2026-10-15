/**
 * @generated SignedSource<<aba39873616d2800222deef45ffd3484>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveStripOdd$data = {
  readonly id: string;
  readonly name: string;
  readonly price: any;
  readonly status: OutcomeStatus;
  readonly " $fragmentType": "LiveStripOdd";
};
export type LiveStripOdd$key = {
  readonly " $data"?: LiveStripOdd$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveStripOdd">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveStripOdd",
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

(node as any).hash = "90b7a317081e2d48c2fb7ec7901f85fb";

export default node;
