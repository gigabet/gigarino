/**
 * @generated SignedSource<<af259f6118117d2f0274fedd52611cfc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveHeader$data = {
  readonly firstLive: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LiveCountryTabs" | "LiveSportTabs">;
  readonly " $fragmentType": "LiveHeader";
};
export type LiveHeader$key = {
  readonly " $data"?: LiveHeader$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveHeader">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "orderBy"
    },
    {
      "kind": "RootArgument",
      "name": "search"
    },
    {
      "kind": "RootArgument",
      "name": "sport"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveHeader",
  "selections": [
    {
      "alias": "firstLive",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        },
        {
          "kind": "Variable",
          "name": "search",
          "variableName": "search"
        },
        {
          "kind": "Variable",
          "name": "sport",
          "variableName": "sport"
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "liveEvents",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Event",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveSportTabs"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveCountryTabs"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "c103cf36dffd7bccc0884dd30379caae";

export default node;
