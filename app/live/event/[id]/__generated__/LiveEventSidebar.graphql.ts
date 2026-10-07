/**
 * @generated SignedSource<<1b6a3bd848e66aeba382e6e42caeedd5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventSidebar$data = {
  readonly liveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly tournament: {
          readonly " $fragmentSpreads": FragmentRefs<"LiveStripTournament">;
        };
        readonly " $fragmentSpreads": FragmentRefs<"LiveEventStrip" | "LiveOrder">;
      };
    }>;
  };
  readonly " $fragmentType": "LiveEventSidebar";
};
export type LiveEventSidebar$key = {
  readonly " $data"?: LiveEventSidebar$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventSidebar">;
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
  "name": "LiveEventSidebar",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "liveEvents",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Event",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                      "kind": "ScalarField",
                      "name": "status",
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
                  "name": "LiveEventStrip"
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
                      "name": "LiveStripTournament"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
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

(node as any).hash = "3f6975cffb3bb8ef8629d397171460ba";

export default node;
