/**
 * @generated SignedSource<<ca1c88e11abce0f4adb9bb6168eb4b27>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FavouriteLiveEvents$data = {
  readonly favouriteLiveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"LiveEvent" | "LiveEventStrip" | "LiveOrder">;
      };
    }>;
  };
  readonly " $fragmentType": "FavouriteLiveEvents";
};
export type FavouriteLiveEvents$key = {
  readonly " $data"?: FavouriteLiveEvents$data;
  readonly " $fragmentSpreads": FragmentRefs<"FavouriteLiveEvents">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
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
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "favouriteLiveEvents"
        ]
      }
    ]
  },
  "name": "FavouriteLiveEvents",
  "selections": [
    {
      "alias": "favouriteLiveEvents",
      "args": [
        {
          "kind": "Literal",
          "name": "favourites",
          "value": true
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "__FavouriteLiveEvents_favouriteLiveEvents_connection",
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
                (v0/*:: as any*/),
                {
                  "kind": "InlineDataFragmentSpread",
                  "name": "LiveOrder",
                  "selections": [
                    (v0/*:: as any*/),
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
                      "selections": (v1/*:: as any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Tournament",
                      "kind": "LinkedField",
                      "name": "tournament",
                      "plural": false,
                      "selections": (v1/*:: as any*/),
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LiveEventStrip"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__FavouriteLiveEvents_favouriteLiveEvents_connection(favourites:true)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "86064618335f29a9e1460111ddf8af74";

export default node;
