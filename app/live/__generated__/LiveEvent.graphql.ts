/**
 * @generated SignedSource<<85d5dc5dd3ba136031f3f2870680b44b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveEvent$data = {
  readonly awayCompetitor: string;
  readonly awayScore: number | null | undefined;
  readonly homeCompetitor: string;
  readonly homeScore: number | null | undefined;
  readonly id: string;
  readonly oddCount: number;
  readonly tradingStatus: TradingStatus;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarkets" | "LiveScore" | "LiveTeams" | "LiveTime">;
  readonly " $fragmentType": "LiveEvent";
};
export type LiveEvent$key = {
  readonly " $data"?: LiveEvent$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEvent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveEvent",
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
      "kind": "ScalarField",
      "name": "tradingStatus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "oddCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTime"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTeams"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveScore"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListViewMarkets"
    }
  ],
  "type": "LiveEvent",
  "abstractKey": null
};

(node as any).hash = "3ce4d526f17372f0eb138153032f1ea3";

export default node;
