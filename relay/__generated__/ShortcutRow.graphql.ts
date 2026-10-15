/**
 * @generated SignedSource<<774b630f325e655740a767cd72cb8f82>>
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
  } | null | undefined>;
  readonly " $fragmentType": "ShortcutRow";
};
export type ShortcutRow$key = {
  readonly " $data"?: ShortcutRow$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShortcutRow">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "RequiredField",
  "field": {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "key",
    "storageKey": null
  },
  "action": "NONE"
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
              "value": 6
            }
          ],
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "topTournaments",
          "plural": true,
          "selections": [
            {
              "kind": "RequiredField",
              "field": {
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
              "action": "NONE"
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
          "storageKey": "topTournaments(first:6)"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "4c5fba739f723022f56c0b8a7f6cfef3";

export default node;
