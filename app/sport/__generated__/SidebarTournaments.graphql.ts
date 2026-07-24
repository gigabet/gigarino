/**
 * @generated SignedSource<<af6dd2d258b29f2113dc73155d4d0b2a>>
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
    readonly eventCount: number;
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "eventCount",
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

(node as any).hash = "3692fbd7974c2acef041e639bba2825f";

export default node;
