/**
 * @generated SignedSource<<9648ca00e1a0046c5298bc15e06e676d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarTournaments$data = {
  readonly id: string;
  readonly tournaments?: ReadonlyArray<{
    readonly key: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "SidebarTournaments";
};
export type SidebarTournaments$key = {
  readonly " $data"?: SidebarTournaments$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarTournaments">;
};

import SidebarTournamentsLoad_graphql from './SidebarTournamentsLoad.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "open"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": SidebarTournamentsLoad_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "SidebarTournaments",
  "selections": [
    {
      "condition": "open",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "tournaments",
          "plural": true,
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
      ]
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "c30e31a1bf1763c6e398ecd77733afd7";

export default node;
