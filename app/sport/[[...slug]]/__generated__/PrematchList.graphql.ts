/**
 * @generated SignedSource<<9b21a2fdd5b7c6293a08604e48f2aeb1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchList$data = {
  readonly topTournaments: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
  }>;
  readonly " $fragmentType": "PrematchList";
};
export type PrematchList$key = {
  readonly " $data"?: PrematchList$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};

import PrematchListRefetch_graphql from './PrematchListRefetch.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": PrematchListRefetch_graphql
    }
  },
  "name": "PrematchList",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 0
            }
          ],
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "topTournaments",
          "plural": true,
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
              "name": "Tournament"
            }
          ],
          "storageKey": "topTournaments(first:0)"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "53b607f298863d8478bafd96d7409225";

export default node;
