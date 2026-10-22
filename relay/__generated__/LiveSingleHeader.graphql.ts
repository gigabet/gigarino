/**
 * @generated SignedSource<<8126e7a7278daef3781c6d2ab4521cba>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type MatchPeriod = "BREAK" | "EXTRA_TIME" | "FIFTH_SET" | "FIRST_HALF" | "FIRST_PERIOD" | "FIRST_SET" | "FOURTH_PERIOD" | "FOURTH_SET" | "HALF_TIME" | "OVERTIME" | "PENALTIES" | "SECOND_HALF" | "SECOND_PERIOD" | "SECOND_SET" | "THIRD_PERIOD" | "THIRD_SET" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveSingleHeader$data = {
  readonly category: {
    readonly name: string;
  };
  readonly period: MatchPeriod | null | undefined;
  readonly sport: {
    readonly key: string;
  };
  readonly status: EventStatus;
  readonly tournament: {
    readonly key: string;
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"FavouriteButton">;
  readonly " $fragmentType": "LiveSingleHeader";
};
export type LiveSingleHeader$key = {
  readonly " $data"?: LiveSingleHeader$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSingleHeader">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveSingleHeader",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sport",
      "plural": false,
      "selections": [
        (v0/*:: as any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tournament",
      "kind": "LinkedField",
      "name": "tournament",
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
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        (v1/*:: as any*/)
      ],
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
      "kind": "ScalarField",
      "name": "period",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FavouriteButton"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "d46c54b78090c02834ccd947c08bc17f";

export default node;
