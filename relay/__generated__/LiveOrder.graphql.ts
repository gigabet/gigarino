/**
 * @generated SignedSource<<923efe61c7e4c6979d433c07ec4042a5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveOrder$data = {
  readonly id: string;
  readonly sport: {
    readonly key: string;
  };
  readonly startTime: string;
  readonly status: EventStatus;
  readonly tournament: {
    readonly key: string;
  };
  readonly " $fragmentType": "LiveOrder";
};
export type LiveOrder$key = {
  readonly " $data"?: LiveOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveOrder">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "LiveOrder"
};

(node as any).hash = "87ca26b091c82a7b5369c098671c255f";

export default node;
