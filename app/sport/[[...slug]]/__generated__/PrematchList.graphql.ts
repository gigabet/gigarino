/**
 * @generated SignedSource<<f7fe420c6160bffc6dd1e66ac9a20c79>>
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

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
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
            },
            {
              "kind": "Literal",
              "name": "sport",
              "value": "football"
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
          "storageKey": "topTournaments(first:4,sport:\"football\")"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "cac9e2e26555e09553dd3e89b98c2c59";

export default node;
