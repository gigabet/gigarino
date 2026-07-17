/**
 * @generated SignedSource<<52084ee94067d2e42e082d5abf7d5fb2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarSport$data = {
  readonly key: string;
  readonly name: string;
  readonly " $fragmentType": "SidebarSport";
};
export type SidebarSport$key = {
  readonly " $data"?: SidebarSport$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarSport",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
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
  "type": "Sport",
  "abstractKey": null
};

(node as any).hash = "b78e973c4ff15c2aa98434db8159556e";

export default node;
