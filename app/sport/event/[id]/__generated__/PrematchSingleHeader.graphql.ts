/**
 * @generated SignedSource<<1db21ee799405839e13dc18603d50113>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleHeader$data = {
  readonly category: {
    readonly name: string;
  };
  readonly sport: {
    readonly key: string;
  };
  readonly tournament: {
    readonly name: string;
  };
  readonly " $fragmentType": "PrematchSingleHeader";
};
export type PrematchSingleHeader$key = {
  readonly " $data"?: PrematchSingleHeader$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleHeader">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
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
  "type": "PrematchEvent",
  "abstractKey": null
};
})();

(node as any).hash = "b38079a6ae3aaaf83ae02567a6fd5a9c";

export default node;
