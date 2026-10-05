/**
 * @generated SignedSource<<09d972597410a487365bb62fb9f94f55>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveOrder$data = {
  readonly id: string;
  readonly sport: {
    readonly key: string;
  };
  readonly startTime: string;
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

(node as any).hash = "8c71151d89f7c27ab0ac6e3a049c2936";

export default node;
