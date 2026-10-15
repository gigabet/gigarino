/**
 * @generated SignedSource<<09c5400427c02f4d20a35d08575dedf6>>
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
    readonly sport: {
      readonly key: string;
    };
  }>;
  readonly " $fragmentType": "SidebarTournaments";
};
export type SidebarTournaments$key = {
  readonly " $data"?: SidebarTournaments$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarTournaments">;
};

import SidebarTournamentsLoad_graphql from './SidebarTournamentsLoad.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
};
return {
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
              "concreteType": "Sport",
              "kind": "LinkedField",
              "name": "sport",
              "plural": false,
              "selections": [
                (v0/*:: as any*/)
              ],
              "storageKey": null
            },
            (v0/*:: as any*/),
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
})();

(node as any).hash = "08bdab1738688869b18bb7e2d1f2948f";

export default node;
