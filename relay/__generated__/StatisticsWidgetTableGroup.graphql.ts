/**
 * @generated SignedSource<<1dadb040a8fad889b9e4279aa3f30e4b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetTableGroup$data = {
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
  readonly " $fragmentType": "StatisticsWidgetTableGroup";
};
export type StatisticsWidgetTableGroup$key = {
  readonly " $data"?: StatisticsWidgetTableGroup$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetTableGroup">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatisticsWidgetTableGroup",
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

(node as any).hash = "1430483b3a9a234ae516cdd338108ec8";

export default node;
