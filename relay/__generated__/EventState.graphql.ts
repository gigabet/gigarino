/**
 * @generated SignedSource<<96bff8c5d8b1c31ac71336463c6d5f55>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EventState$data = {
  readonly awayScore: number | null | undefined;
  readonly homeScore: number | null | undefined;
  readonly status: EventStatus;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTime">;
  readonly " $fragmentType": "EventState";
};
export type EventState$key = {
  readonly " $data"?: EventState$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventState">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventState",
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
      "name": "homeScore",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayScore",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTime"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "df9d36e235e1f964eb25478ad4ff19ae";

export default node;
