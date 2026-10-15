/**
 * @generated SignedSource<<7136fa6798f14ec0d2391f8e60e6e1cd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FavouriteButton$data = {
  readonly id: string;
  readonly isFavourite: boolean;
  readonly isLive: boolean;
  readonly " $fragmentType": "FavouriteButton";
};
export type FavouriteButton$key = {
  readonly " $data"?: FavouriteButton$data;
  readonly " $fragmentSpreads": FragmentRefs<"FavouriteButton">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FavouriteButton",
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
      "name": "isFavourite",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLive",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "1cba60413f5845e247c9ce065967d2a9";

export default node;
