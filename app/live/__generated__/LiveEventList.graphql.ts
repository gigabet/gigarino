/**
 * @generated SignedSource<<3d71a083e4c1de60fd47be02ee4083f9>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventList$data = {
  readonly liveEvents: ReadonlyArray<{
    readonly sport: {
      readonly key: string;
    };
    readonly startTime: string;
    readonly tournament: {
      readonly key: string;
      readonly " $fragmentSpreads": FragmentRefs<"LiveTournament">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"LiveEvent">;
  }>;
  readonly " $fragmentType": "LiveEventList";
};
export type LiveEventList$key = {
  readonly " $data"?: LiveEventList$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventList">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
};
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
          "selections": [
            (v0/*:: as any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "tournament",
          "plural": false,
          "selections": [
            (v0/*:: as any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "LiveTournament"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LiveEvent"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "f7d37e2ff17648faa7296b21775f7950";

export default node;
