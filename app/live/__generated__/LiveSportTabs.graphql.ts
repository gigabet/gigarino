/**
 * @generated SignedSource<<ee8e0fa600c04b137e4deb7eab0b2695>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSportTabs$data = {
  readonly liveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly sport: {
          readonly key: string;
          readonly name: string;
        };
      };
    }>;
    readonly totalCount: number;
  };
  readonly " $fragmentType": "LiveSportTabs";
};
export type LiveSportTabs$key = {
  readonly " $data"?: LiveSportTabs$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSportTabs">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveSportTabs",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 100
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "liveEvents",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
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
                  "concreteType": "Sport",
                  "kind": "LinkedField",
                  "name": "sport",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "key",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
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
      "storageKey": "liveEvents(first:100)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8e606aa341816459e1e4b780b47238ac";

export default node;
