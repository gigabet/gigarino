/**
 * @generated SignedSource<<4ea1d10ec1697aa773635ba2b2126686>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveTournamentTitle$data = {
  readonly category: {
    readonly countryCode: string | null | undefined;
    readonly name: string;
  };
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "LiveTournamentTitle";
};
export type LiveTournamentTitle$key = {
  readonly " $data"?: LiveTournamentTitle$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTournamentTitle">;
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
  "name": "LiveTournamentTitle",
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

(node as any).hash = "8cf3330ce7473876e25bf935bfded4a7";

export default node;
