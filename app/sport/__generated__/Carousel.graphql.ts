/**
 * @generated SignedSource<<a3675bf3d2ea20e591099be5ba13ec92>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FeaturedBetKind = "BET_BOOST" | "COMBO_OF_WEEK" | "FEATURED_GAME" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Carousel$data = {
  readonly featuredBets: ReadonlyArray<{
    readonly id: string;
    readonly kind: FeaturedBetKind;
    readonly " $fragmentSpreads": FragmentRefs<"BetBoostCard" | "ComboOfWeekCard" | "FeaturedGameCard">;
  }>;
  readonly " $fragmentType": "Carousel";
};
export type Carousel$key = {
  readonly " $data"?: Carousel$data;
  readonly " $fragmentSpreads": FragmentRefs<"Carousel">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Carousel",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FeaturedBet",
      "kind": "LinkedField",
      "name": "featuredBets",
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
          "name": "kind",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BetBoostCard"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ComboOfWeekCard"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FeaturedGameCard"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1a12c8413fe132fff2031ce2583318ca";

export default node;
