/**
 * @generated SignedSource<<583dbc72ba4286c1735ea8f42a308f2f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PageStatsView$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidget">;
  readonly " $fragmentType": "PageStatsView";
};
export type PageStatsView$key = {
  readonly " $data"?: PageStatsView$data;
  readonly " $fragmentSpreads": FragmentRefs<"PageStatsView">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PageStatsView",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "StatisticsWidget"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "105bf0ba24f9b2625bcb1b8bb27d8a71";

export default node;
