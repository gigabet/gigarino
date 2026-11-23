/**
 * @generated SignedSource<<9153d2490e8c6caee0a609746e6e5c1f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetRejectionCode = "BOOST_LIMIT" | "BOOST_UNAVAILABLE" | "CASHOUT_UNAVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "INSUFFICIENT_FUNDS" | "INTERNAL_ERROR" | "LIABILITY_LIMIT" | "LIVE_STATE_CHANGED" | "MULTI_SINGLE_NOT_SUPPORTED" | "ODDS_LIMIT" | "ODDS_UNAVAILABLE" | "OUTCOME_NOT_AVAILABLE" | "PRICE_CHANGED" | "PROVIDER_CURRENCY" | "RESPONSIBLE_GAMING" | "STAKE_LIMIT" | "SYSTEM_NOT_SUPPORTED" | "WALLET_UNAVAILABLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BlockersBanner$data = {
  readonly blockers: ReadonlyArray<BetRejectionCode>;
  readonly " $fragmentType": "BlockersBanner";
};
export type BlockersBanner$key = {
  readonly " $data"?: BlockersBanner$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlockersBanner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BlockersBanner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blockers",
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "11b3204e91cf9deeb82a2d3c4305fcf9";

export default node;
