/**
 * @generated SignedSource<<16677917a709a9e85fab59712bb26aa1>>
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
              "concreteType": "Sport",
              "kind": "LinkedField",
              "name": "sport",
              "plural": false,
              "selections": [
                (v0/*:: as any*/)
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
})();

(node as any).hash = "8568e75163530815a784f64680044b86";

export default node;
