/**
 * @generated SignedSource<<4213f9cf0ff76e61d332bd4c34406a55>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarCountryItem$data = {
  readonly countryCode: string | null | undefined;
  readonly id: string;
  readonly key: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarTournaments">;
  readonly " $fragmentType": "SidebarCountryItem";
};
export type SidebarCountryItem$key = {
  readonly " $data"?: SidebarCountryItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarCountryItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarCountryItem",
  "selections": [
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
      "name": "key",
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
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SidebarTournaments"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "d90d29a0b058faee46e49399ff3afdf3";

export default node;
