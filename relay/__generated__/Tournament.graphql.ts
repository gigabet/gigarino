/**
 * @generated SignedSource<<cb82c8c1e0486b6407ebf8672a99d882>>
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
    readonly name: string;
  };
  readonly id: string;
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LeagueTableButton" | "TournamentEventList">;
  readonly " $fragmentType": "Tournament";
} | null | undefined;
export type Tournament$key = {
  readonly " $data"?: Tournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
};

import TournamentRefetch_graphql from './TournamentRefetch.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
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
        (v0/*:: as any*/),
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
    (v0/*:: as any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LeagueTableButton"
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
})();

(node as any).hash = "e194a0ed94a7b2873a7eaafa9d4790b3";

export default node;
