/**
 * @generated SignedSource<<015a20b3215464a55199796995536d43>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveTeams$data = {
  readonly awayCompetitor: string;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeImageUrl: string | null | undefined;
  readonly redCards: {
    readonly away: number;
    readonly home: number;
  } | null | undefined;
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

(node as any).hash = "b911e48a53a68269304ab693840ffec9";

export default node;
