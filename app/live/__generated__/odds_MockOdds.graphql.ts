/**
 * @generated SignedSource<<d3c60b577bd10647be6d63792fa1c7b7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type odds_MockOdds$data = {
  readonly away: number;
  readonly draw: number;
  readonly home: number;
  readonly " $fragmentType": "odds_MockOdds";
};
export type odds_MockOdds$key = {
  readonly " $data"?: odds_MockOdds$data;
  readonly " $fragmentSpreads": FragmentRefs<"odds_MockOdds">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "odds_MockOdds",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "home",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "away",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "draw",
      "storageKey": null
    }
  ],
  "type": "MockOdds",
  "abstractKey": null
};

(node as any).hash = "5aa88f418d048f50f3e561930ccbfe6e";

export default node;
