/**
 * @generated SignedSource<<a6f514ead0b37d94f5bc392cd05be6ab>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSportTabs$data = {
  readonly liveEvents: ReadonlyArray<{
    readonly sport: {
      readonly key: string;
      readonly name: string;
    };
  }>;
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
      "args": null,
      "concreteType": "LiveEvent",
      "kind": "LinkedField",
      "name": "liveEvents",
      "plural": true,
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
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a3503ba41504962c0c129c359faaa6d9";

export default node;
