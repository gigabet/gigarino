/**
 * @generated SignedSource<<359316a7630c9d3ff13f4e3c3a1eb78a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveTournament$data = {
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LiveTournamentTitle">;
  readonly " $fragmentType": "LiveTournament";
};
export type LiveTournament$key = {
  readonly " $data"?: LiveTournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTournament">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveTournament",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTournamentTitle"
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};

(node as any).hash = "2db3c78e74ef3aa76207bbd206b8f1b7";

export default node;
