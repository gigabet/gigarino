/**
 * @generated SignedSource<<e8fc35afb78194e59b78462491869a9d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TopTournaments$data = {
  readonly tt_topTournaments: ReadonlyArray<{
    readonly category: {
      readonly countryCode: string | null | undefined;
      readonly name: string;
    };
    readonly eventCount: number;
    readonly key: string;
    readonly name: string;
    readonly sport: {
      readonly key: string;
    };
  } | null | undefined>;
  readonly " $fragmentType": "TopTournaments";
};
export type TopTournaments$key = {
  readonly " $data"?: TopTournaments$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopTournaments">;
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
  "name": "TopTournaments",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": "tt_topTournaments",
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
            (v1/*:: as any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Category",
              "kind": "LinkedField",
              "name": "category",
              "plural": false,
              "selections": [
                (v1/*:: as any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "countryCode",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "eventCount",
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

(node as any).hash = "e594fc99230f1442913ece45f34ac5f8";

export default node;
