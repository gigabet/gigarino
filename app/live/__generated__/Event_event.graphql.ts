/**
 * @generated SignedSource<<8103bb265a8e8b8e4102e1bbdb721834>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Event_event$data = {
  readonly id: string;
  readonly league: string;
  readonly name: string;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"Event_odds">;
  readonly " $fragmentType": "Event_event";
};
export type Event_event$key = {
  readonly " $data"?: Event_event$data;
  readonly " $fragmentSpreads": FragmentRefs<"Event_event">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Event_event",
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
      "name": "league",
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
      "name": "startTime",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Event_odds"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "fdbd467500364c68912407f07fc3494c";

export default node;
