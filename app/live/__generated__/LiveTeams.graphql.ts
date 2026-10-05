/**
 * @generated SignedSource<<37640267b5b49ce127e443abc9f60b5e>>
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
    }
  ],
  "type": "LiveEvent",
  "abstractKey": null
};

(node as any).hash = "6ce011388cef3ba6c3b3ca9d38dff9fd";

export default node;
