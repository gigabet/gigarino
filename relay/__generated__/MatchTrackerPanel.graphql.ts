/**
 * @generated SignedSource<<cf65e886d4af62a4415efd597ee4464d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MatchTrackerPanel$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly " $fragmentSpreads": FragmentRefs<"MatchTracker">;
  readonly " $fragmentType": "MatchTrackerPanel";
};
export type MatchTrackerPanel$key = {
  readonly " $data"?: MatchTrackerPanel$data;
  readonly " $fragmentSpreads": FragmentRefs<"MatchTrackerPanel">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MatchTrackerPanel",
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
      "name": "MatchTracker"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "0468f3d83ddad0f7ec22710e50b7f6f9";

export default node;
