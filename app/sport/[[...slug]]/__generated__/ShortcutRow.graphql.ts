/**
 * @generated SignedSource<<00f20c2dc2ee19116f813a56b10c457c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShortcutRow$data = {
  readonly scr_topTournaments: ReadonlyArray<{
    readonly key: string;
    readonly name: string;
    readonly sport: {
      readonly key: string;
    };
  }>;
  readonly " $fragmentType": "ShortcutRow";
};
export type ShortcutRow$key = {
  readonly " $data"?: ShortcutRow$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShortcutRow">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShortcutRow",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": "scr_topTournaments",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 4
            }
          ],
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "topTournaments",
          "plural": true,
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
            (v0/*:: as any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": "topTournaments(first:4)"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "d5bf894a43f5d5f13f07fae6f38c392e";

export default node;
