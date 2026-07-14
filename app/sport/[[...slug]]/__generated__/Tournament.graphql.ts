/**
 * @generated SignedSource<<4f5ad4a68b1ff0adacc6e4f962aae9d2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Tournament$data = {
  readonly category: {
    readonly countryCode: string | null | undefined;
  };
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"TournamentEventList">;
  readonly " $fragmentType": "Tournament";
};
export type Tournament$key = {
  readonly " $data"?: Tournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Tournament",
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TournamentEventList"
        }
      ]
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};

(node as any).hash = "80b8c59a04f2c826c186a06d5985e2ad";

export default node;
