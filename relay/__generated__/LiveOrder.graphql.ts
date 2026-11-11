/**
 * @generated SignedSource<<d5a815b9981fe944f596ce8c2502e633>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveOrder$data = ReadonlyArray<{
  readonly category: {
    readonly key: string;
  };
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
}>;
export type LiveOrder$key = ReadonlyArray<{
  readonly " $data"?: LiveOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveOrder">;
}>;

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "key",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "LiveOrder",
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
      "args": null,
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sport",
      "plural": false,
      "selections": (v0/*:: as any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tournament",
      "kind": "LinkedField",
      "name": "tournament",
      "plural": false,
      "selections": (v0/*:: as any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": (v0/*:: as any*/),
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "8bb60da4eb4c81d1817d4294e7141364";

export default node;
