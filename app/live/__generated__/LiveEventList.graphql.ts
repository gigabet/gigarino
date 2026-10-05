/**
 * @generated SignedSource<<d0b0ee4c0e0082558444f1bea302775b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventList$data = {
  readonly liveEvents: ReadonlyArray<{
    readonly tournament: {
      readonly " $fragmentSpreads": FragmentRefs<"LiveTournament">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"LiveEvent" | "LiveOrder">;
  }>;
  readonly " $fragmentType": "LiveEventList";
};
export type LiveEventList$key = {
  readonly " $data"?: LiveEventList$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventList">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "key",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveEventList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "LiveEvent",
      "kind": "LinkedField",
      "name": "liveEvents",
      "plural": true,
      "selections": [
        {
          "kind": "InlineDataFragmentSpread",
          "name": "LiveOrder",
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
              "name": "startTime",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Sport",
              "kind": "LinkedField",
              "name": "sport",
              "plural": false,
              "selections": (v0/*:: as any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Tournament",
              "kind": "LinkedField",
              "name": "tournament",
              "plural": false,
              "selections": (v0/*:: as any*/),
              "storageKey": null
            }
          ],
          "args": null,
          "argumentDefinitions": []
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LiveEvent"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "tournament",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "LiveTournament"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "bfcde1eb528f7fa116d83fbd58587433";

export default node;
