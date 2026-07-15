/**
 * @generated SignedSource<<5846846fa782a2f6c222e918921c5f06>>
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
              "value": 4
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
          "storageKey": "topTournaments(first:4)"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "69037aef10da82543cefe65eb351084f";

export default node;
