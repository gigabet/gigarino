/**
 * @generated SignedSource<<87194850c3d48932bd90fbaa3f5574bc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LeagueTableButton$data = {
  readonly category: {
    readonly name: string;
  };
  readonly id: string;
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "LeagueTableButton";
};
export type LeagueTableButton$key = {
  readonly " $data"?: LeagueTableButton$data;
  readonly " $fragmentSpreads": FragmentRefs<"LeagueTableButton">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
  "name": "LeagueTableButton",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*:: as any*/),
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
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        (v0/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};
})();

(node as any).hash = "35ae9d95d1ad509c945fadc4f507c6b1";

export default node;
