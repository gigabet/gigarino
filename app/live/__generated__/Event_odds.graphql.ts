/**
 * @generated SignedSource<<f3c7b8b73b57222e948207fc1b28f973>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Event_odds$data = {
  readonly id: string;
  readonly odds: {
    readonly away: number;
    readonly draw: number;
    readonly home: number;
    readonly id: string;
  };
  readonly " $fragmentType": "Event_odds";
};
export type Event_odds$key = {
  readonly " $data"?: Event_odds$data;
  readonly " $fragmentSpreads": FragmentRefs<"Event_odds">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Event_odds",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Odds",
      "kind": "LinkedField",
      "name": "odds",
      "plural": false,
      "selections": [
        (v0/*:: as any*/),
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
})();

(node as any).hash = "adde88440e4aed9d557caee00d4aff6e";

export default node;
