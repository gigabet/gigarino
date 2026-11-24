/**
 * @generated SignedSource<<24108fa924d866428f07216950207ca7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetTable$data = {
  readonly standings: {
    readonly currentRound: number | null | undefined;
    readonly groups: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetTableGroup">;
    }>;
    readonly maxRounds: number | null | undefined;
    readonly season: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "StatisticsWidgetTable";
};
export type StatisticsWidgetTable$key = {
  readonly " $data"?: StatisticsWidgetTable$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetTable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatisticsWidgetTable",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Standings",
      "kind": "LinkedField",
      "name": "standings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "season",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currentRound",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxRounds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "StandingGroup",
          "kind": "LinkedField",
          "name": "groups",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "StatisticsWidgetTableGroup"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};

(node as any).hash = "2ffacd3402283f4d2ec2a0614d2dbb64";

export default node;
