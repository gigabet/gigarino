/**
 * @generated SignedSource<<94f445295c7045aaa521913023520c0f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type Side = "AWAY" | "HOME" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveScoreState$data = {
  readonly periodScores: ReadonlyArray<{
    readonly away: string;
    readonly home: string;
    readonly period: number;
  }>;
  readonly pointScore: {
    readonly away: string;
    readonly home: string;
  } | null | undefined;
  readonly serving: Side | null | undefined;
  readonly status: EventStatus;
  readonly " $fragmentType": "LiveScoreState";
};
export type LiveScoreState$key = {
  readonly " $data"?: LiveScoreState$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveScoreState">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveScoreState",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serving",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PointScore",
      "kind": "LinkedField",
      "name": "pointScore",
      "plural": false,
      "selections": [
        (v0/*:: as any*/),
        (v1/*:: as any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PeriodScore",
      "kind": "LinkedField",
      "name": "periodScores",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "period",
          "storageKey": null
        },
        (v0/*:: as any*/),
        (v1/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "4f00cd766a3d1c9ec731df3a6bc8c4dc";

export default node;
