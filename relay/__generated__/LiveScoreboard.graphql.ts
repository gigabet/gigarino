/**
 * @generated SignedSource<<d5feb1415156a96ddd763712ce709678>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveScoreboard$data = {
  readonly awayCompetitor: string;
  readonly awayScore: number | null | undefined;
  readonly homeCompetitor: string;
  readonly homeScore: number | null | undefined;
  readonly periodScores: ReadonlyArray<{
    readonly away: string;
    readonly home: string;
    readonly period: number;
  }>;
  readonly pointScore: {
    readonly away: string;
    readonly home: string;
  } | null | undefined;
  readonly sport: {
    readonly key: string;
  };
  readonly status: EventStatus;
  readonly " $fragmentType": "LiveScoreboard";
};
export type LiveScoreboard$key = {
  readonly " $data"?: LiveScoreboard$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveScoreboard">;
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
  "name": "LiveScoreboard",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeScore",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayScore",
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

(node as any).hash = "cc49f1c2630dd89c3ed7dfe51727b18e";

export default node;
