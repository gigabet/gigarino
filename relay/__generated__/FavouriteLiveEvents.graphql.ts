/**
 * @generated SignedSource<<ed8ed1392389a7c71dfbc353f1155e6a>>
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

const node: ReaderFragment = {
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LiveOrder"
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

(node as any).hash = "86064618335f29a9e1460111ddf8af74";

export default node;
