/**
 * @generated SignedSource<<927bcdfeab9f19c03e0650573db2e51a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveSportTabs$data = {
  readonly liveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly sport: {
          readonly key: string;
          readonly name: string;
        };
        readonly status: EventStatus;
      };
    }>;
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

(node as any).hash = "bf86a4f78d4ff0bcf999bb03afa44f74";

export default node;
