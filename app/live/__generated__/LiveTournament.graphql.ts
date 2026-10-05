/**
 * @generated SignedSource<<dbb391035832303915b2db6daef32a0d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveTournament$data = {
  readonly category: {
    readonly countryCode: string | null | undefined;
    readonly name: string;
  };
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "LiveTournament";
};
export type LiveTournament$key = {
  readonly " $data"?: LiveTournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTournament">;
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
  "name": "LiveTournament",
  "selections": [
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
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};
})();

(node as any).hash = "f6c9ac12655fa3f01a3e03692f22a79e";

export default node;
