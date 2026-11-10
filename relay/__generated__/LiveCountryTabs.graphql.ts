/**
 * @generated SignedSource<<19794f15a450d4c86e935bb23b45eb8b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveCountryTabs$data = {
  readonly countryEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly category: {
          readonly countryCode: string | null | undefined;
          readonly name: string;
        };
      };
    }>;
  };
  readonly " $fragmentType": "LiveCountryTabs";
};
export type LiveCountryTabs$key = {
  readonly " $data"?: LiveCountryTabs$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveCountryTabs">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
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
  "name": "LiveCountryTabs",
  "selections": [
    {
      "alias": "countryEvents",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 100
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
                  "concreteType": "Category",
                  "kind": "LinkedField",
                  "name": "category",
                  "plural": false,
                  "selections": [
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
                    }
                  ],
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9e9ba0d6e368d3ee02a211a75e59ac36";

export default node;
