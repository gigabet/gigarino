/**
 * @generated SignedSource<<ac737f5a567ceae87223b3ddf4bfff21>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type Side = "AWAY" | "HOME" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetTimeline$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly timeline: ReadonlyArray<{
    readonly addedTime: number | null | undefined;
    readonly id: string;
    readonly minute: number | null | undefined;
    readonly side: Side;
    readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetIncident">;
  }>;
  readonly " $fragmentType": "StatisticsWidgetTimeline";
};
export type StatisticsWidgetTimeline$key = {
  readonly " $data"?: StatisticsWidgetTimeline$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetTimeline">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatisticsWidgetTimeline",
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
      "name": "awayCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "types",
          "value": [
            "GOAL",
            "RED_CARD",
            "PENALTY",
            "CORNER",
            "YELLOW_CARD"
          ]
        }
      ],
      "concreteType": "MatchIncident",
      "kind": "LinkedField",
      "name": "timeline",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "side",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minute",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "addedTime",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StatisticsWidgetIncident"
        }
      ],
      "storageKey": "timeline(types:[\"GOAL\",\"RED_CARD\",\"PENALTY\",\"CORNER\",\"YELLOW_CARD\"])"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "5ae0b23d05f4ddb8dfcda605ce673ae6";

export default node;
