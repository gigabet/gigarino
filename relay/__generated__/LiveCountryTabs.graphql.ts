/**
 * @generated SignedSource<<642dcedfc7c4f0cfac56c19a0c893d30>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveCountryTabs$data = {
  readonly sports: ReadonlyArray<{
    readonly key: string;
    readonly liveCategories: ReadonlyArray<{
      readonly countryCode: string | null | undefined;
      readonly key: string;
      readonly liveEventCount: number;
      readonly name: string;
    }>;
  }>;
  readonly " $fragmentType": "LiveCountryTabs";
};
export type LiveCountryTabs$key = {
  readonly " $data"?: LiveCountryTabs$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveCountryTabs">;
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
  "name": "LiveCountryTabs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sports",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Category",
          "kind": "LinkedField",
          "name": "liveCategories",
          "plural": true,
          "selections": [
            (v0/*:: as any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "countryCode",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "liveEventCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "551ba7dc5de2acaf98569926a49579a6";

export default node;
