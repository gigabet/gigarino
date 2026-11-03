/**
 * @generated SignedSource<<740eb17969366876a4b2d6ce4921cda2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type Side = "AWAY" | "HOME" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServingIndicator$data = {
  readonly serving: Side | null | undefined;
  readonly status: EventStatus;
  readonly " $fragmentType": "ServingIndicator";
};
export type ServingIndicator$key = {
  readonly " $data"?: ServingIndicator$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServingIndicator">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServingIndicator",
  "selections": [
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
      "name": "serving",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "f63f4c726f43e2d55adc67044550ddcd";

export default node;
