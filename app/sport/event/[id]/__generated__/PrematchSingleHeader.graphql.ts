/**
 * @generated SignedSource<<f2d971f69c1d5a0eeb286fd3706232e7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleHeader$data = {
  readonly category: {
    readonly name: string;
  };
  readonly sport: {
    readonly key: string;
  };
  readonly status: EventStatus;
  readonly tournament: {
    readonly key: string;
    readonly name: string;
  };
  readonly " $fragmentType": "PrematchSingleHeader";
};
export type PrematchSingleHeader$key = {
  readonly " $data"?: PrematchSingleHeader$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleHeader">;
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
  "name": "PrematchSingleHeader",
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
    }
  ],
  "type": "PrematchEvent",
  "abstractKey": null
};
})();

(node as any).hash = "7b7ddbdf2a62946facb9ca8b62d7d5ac";

export default node;
