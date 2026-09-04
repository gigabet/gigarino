/**
 * @generated SignedSource<<c8a7184a9666ceee3e9726b7874da0fb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarMarket$data = {
  readonly id: string;
  readonly kind: string;
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly " $fragmentSpreads": FragmentRefs<"EventSidebarOdd">;
  }>;
  readonly " $fragmentType": "EventSidebarMarket";
};
export type EventSidebarMarket$key = {
  readonly " $data"?: EventSidebarMarket$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebarMarket">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebarMarket",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kind",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Outcome",
      "kind": "LinkedField",
      "name": "outcomes",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "index",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EventSidebarOdd"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};
})();

(node as any).hash = "630693c0d3f5e90ed9dcaf6648db9243";

export default node;
