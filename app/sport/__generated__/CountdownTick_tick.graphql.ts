/**
 * @generated SignedSource<<d19b60e9399a27266c0310c08a6c18c8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CountdownTick_tick$data = {
  readonly id: string;
  readonly value: number;
  readonly " $fragmentType": "CountdownTick_tick";
};
export type CountdownTick_tick$key = {
  readonly " $data"?: CountdownTick_tick$data;
  readonly " $fragmentSpreads": FragmentRefs<"CountdownTick_tick">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CountdownTick_tick",
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
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "CountdownTick",
  "abstractKey": null
};

(node as any).hash = "b08667e44db2447613650cc123e6b071";

export default node;
