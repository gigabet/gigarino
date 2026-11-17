/**
 * @generated SignedSource<<1e0a04596916a1cacd96e5a921e7b999>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetTimeline$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly timeline: ReadonlyArray<{
    readonly id: string;
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
      "args": null,
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "StatisticsWidgetIncident"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "154a32b0033f4359eb0a5b88fcc31989";

export default node;
