/**
 * @generated SignedSource<<7b65b96f390f1266baf8f6617a392a19>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchEvent$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarkets">;
  readonly " $fragmentType": "PrematchEvent";
};
export type PrematchEvent$key = {
  readonly " $data"?: PrematchEvent$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchEvent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrematchEvent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayCompetitor",
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
      "name": "ListViewMarkets"
    }
  ],
  "type": "PrematchEvent",
  "abstractKey": null
};

(node as any).hash = "baf412bd60bc0dd0292be522936b8a47";

export default node;
