/**
 * @generated SignedSource<<aed8620e9166f16001abb3b079fb7c85>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShortcutRow$data = {
  readonly scr_topTournaments: ReadonlyArray<{
    readonly id: string;
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

const node: ReaderFragment = {
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
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
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

(node as any).hash = "4a54ed47458a00e721b14879a8fb4192";

export default node;
