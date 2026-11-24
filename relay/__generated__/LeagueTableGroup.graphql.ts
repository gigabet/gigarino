/**
 * @generated SignedSource<<07470acdb57d1fcb8c5a9413bbccd07e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LeagueTableGroup$data = {
  readonly name: string | null | undefined;
  readonly rows: ReadonlyArray<{
    readonly drawn: number;
    readonly goalsAgainst: number;
    readonly goalsFor: number;
    readonly lost: number;
    readonly played: number;
    readonly points: number;
    readonly position: number;
    readonly teamName: string;
    readonly won: number;
    readonly zone: string | null | undefined;
  }>;
  readonly " $fragmentType": "LeagueTableGroup";
};
export type LeagueTableGroup$key = {
  readonly " $data"?: LeagueTableGroup$data;
  readonly " $fragmentSpreads": FragmentRefs<"LeagueTableGroup">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LeagueTableGroup",
  "selections": [
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
      "concreteType": "StandingRow",
      "kind": "LinkedField",
      "name": "rows",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "position",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "teamName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "played",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "won",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "drawn",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lost",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "goalsFor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "goalsAgainst",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "points",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "zone",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StandingGroup",
  "abstractKey": null
};

(node as any).hash = "22fd1b56e2f8a9449d89e262dd5d9be1";

export default node;
