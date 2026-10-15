/**
 * @generated SignedSource<<522dbbf7189a90713c9ad5fcd782ec6d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FavouriteEvents$data = {
  readonly events: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly isLive: boolean;
        readonly " $fragmentSpreads": FragmentRefs<"PrematchEvent">;
      };
    }>;
  };
  readonly " $fragmentType": "FavouriteEvents";
};
export type FavouriteEvents$key = {
  readonly " $data"?: FavouriteEvents$data;
  readonly " $fragmentSpreads": FragmentRefs<"FavouriteEvents">;
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
          "events"
        ]
      }
    ]
  },
  "name": "FavouriteEvents",
  "selections": [
    {
      "alias": "events",
      "args": [
        {
          "kind": "Literal",
          "name": "favourites",
          "value": true
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "__FavouriteEvents_events_connection",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isLive",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PrematchEvent"
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
      "storageKey": "__FavouriteEvents_events_connection(favourites:true)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8ab050344566485eeeaceb8df98fe0d2";

export default node;
