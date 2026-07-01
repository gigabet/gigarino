/**
 * @generated SignedSource<<c968cc81b39c091f0f8cc134e01c5462>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Event_odds$data = {
  readonly odds: {
    readonly away: number;
    readonly draw: number;
    readonly home: number;
  };
  readonly " $fragmentType": "Event_odds";
};
export type Event_odds$key = {
  readonly " $data"?: Event_odds$data;
  readonly " $fragmentSpreads": FragmentRefs<"Event_odds">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Event_odds",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Odds",
      "kind": "LinkedField",
      "name": "odds",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "2e7b03cd3eaac33d43bdf9f839ad40a6";

export default node;
