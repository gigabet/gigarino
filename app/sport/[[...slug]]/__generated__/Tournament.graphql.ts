/**
 * @generated SignedSource<<a85e1dc2e619dd284d0f1d6245c8fd0e>>
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
  readonly id: string;
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"TournamentEventList">;
  readonly " $fragmentType": "Tournament";
} | null | undefined;
export type Tournament$key = {
  readonly " $data"?: Tournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
};

import TournamentRefetch_graphql from './TournamentRefetch.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "eventCount"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": TournamentRefetch_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "Tournament",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "sport",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "key",
              "storageKey": null
            },
            "action": "NONE"
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
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

(node as any).hash = "f97ec6505b7c9262346c0437e8c3d70f";

export default node;
