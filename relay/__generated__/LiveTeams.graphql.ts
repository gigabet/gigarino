/**
 * @generated SignedSource<<48bd079fdcf9f0a97a35b386e8cc07de>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveTeams$data = {
  readonly awayCompetitor: string;
  readonly awayCountryCode: string | null | undefined;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeCountryCode: string | null | undefined;
  readonly homeImageUrl: string | null | undefined;
  readonly redCards: {
    readonly away: number;
    readonly home: number;
  } | null | undefined;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "LiveTeams";
};
export type LiveTeams$key = {
  readonly " $data"?: LiveTeams$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTeams">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveTeams",
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
      "kind": "ScalarField",
      "name": "homeCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeCountryCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayCountryCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "RedCards",
      "kind": "LinkedField",
      "name": "redCards",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "home",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "away",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "919d33a355286c7db350320be140fb20";

export default node;
