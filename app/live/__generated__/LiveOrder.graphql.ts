/**
 * @generated SignedSource<<988045c24834d84de5e23b1028be5199>>
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

(node as any).hash = "cf03fc0e66a28f2c302531c6bcba2dc8";

export default node;
