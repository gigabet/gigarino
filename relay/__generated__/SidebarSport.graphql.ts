/**
 * @generated SignedSource<<d0af1b4b89421404a82701df74240301>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarSport$data = {
  readonly eventCount: number;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eventCount",
      "storageKey": null
    }
  ],
  "type": "Sport",
  "abstractKey": null
};

(node as any).hash = "4ef918e19b7af125fccb19e85237643a";

export default node;
