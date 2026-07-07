/**
 * @generated SignedSource<<fcf4d8224aedec36e93b239389a5e898>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type liveEvent_Event$data = {
  readonly id: string;
  readonly league: string;
  readonly name: string;
  readonly odds: {
    readonly " $fragmentSpreads": FragmentRefs<"odds_MockOdds">;
  };
  readonly startTime: string;
  readonly " $fragmentType": "liveEvent_Event";
};
export type liveEvent_Event$key = {
  readonly " $data"?: liveEvent_Event$data;
  readonly " $fragmentSpreads": FragmentRefs<"liveEvent_Event">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "liveEvent_Event",
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
      "alias": null,
      "args": null,
      "concreteType": "MockOdds",
      "kind": "LinkedField",
      "name": "odds",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "odds_MockOdds"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MockEvent",
  "abstractKey": null
};

(node as any).hash = "60a2f491b9c8971b807412bd5ea637e4";

export default node;
