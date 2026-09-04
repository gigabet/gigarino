/**
 * @generated SignedSource<<0e8f5b8697c3c502abdb5a4ed277dcc6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EventStripCard$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly id: string;
  readonly markets: ReadonlyArray<{
    readonly id: string;
    readonly kind: string;
    readonly " $fragmentSpreads": FragmentRefs<"EventSidebarMarket">;
  }>;
  readonly startTime: string;
  readonly status: EventStatus;
  readonly " $fragmentType": "EventStripCard";
};
export type EventStripCard$key = {
  readonly " $data"?: EventStripCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventStripCard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventStripCard",
  "selections": [
    (v0/*:: as any*/),
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
      "name": "startTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "groups",
          "value": [
            "MAIN"
          ]
        }
      ],
      "concreteType": "Market",
      "kind": "LinkedField",
      "name": "markets",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
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
          "name": "EventSidebarMarket"
        }
      ],
      "storageKey": "markets(groups:[\"MAIN\"])"
    }
  ],
  "type": "PrematchEvent",
  "abstractKey": null
};
})();

(node as any).hash = "a130bbb6683adde2eb0041ead8c5271e";

export default node;
