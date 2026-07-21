/**
 * @generated SignedSource<<6066040f7f6ba464d9d32d4ac1b3e7c7>>
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
    readonly events: {
      readonly totalCount: number;
    };
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
              "concreteType": "EventConnection",
              "kind": "LinkedField",
              "name": "events",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "totalCount",
                  "storageKey": null
                }
              ],
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

(node as any).hash = "602b69ef6a9fd1aee0589d2737749803";

export default node;
