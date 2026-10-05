/**
 * @generated SignedSource<<07b8422fee7924b06c835c4fe7254d56>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveStripTournament$data = {
  readonly category: {
    readonly name: string;
  };
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "LiveStripTournament";
};
export type LiveStripTournament$key = {
  readonly " $data"?: LiveStripTournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveStripTournament">;
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
  "name": "LiveStripTournament",
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
        (v0/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};
})();

(node as any).hash = "71e6632f1d115f63bcc10b94c0c85d1a";

export default node;
