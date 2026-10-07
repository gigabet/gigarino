/**
 * @generated SignedSource<<e862d3cb8f336bf522a8c14a04682ddc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveHeader$data = {
  readonly liveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"LiveOrder">;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LiveSportTabs">;
  readonly " $fragmentType": "LiveHeader";
};
export type LiveHeader$key = {
  readonly " $data"?: LiveHeader$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveHeader">;
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
  "name": "LiveHeader",
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveSportTabs"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "923bf7d88bb894307700ca6512003228";

export default node;
