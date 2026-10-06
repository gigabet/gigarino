/**
 * @generated SignedSource<<6234c51a5eb9ed83c6b98f4e2d0922a0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TournamentEventList$data = {
  readonly events: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly isLive: boolean;
        readonly " $fragmentSpreads": FragmentRefs<"PrematchEvent">;
      };
    }>;
  };
  readonly " $fragmentType": "TournamentEventList";
};
export type TournamentEventList$key = {
  readonly " $data"?: TournamentEventList$data;
  readonly " $fragmentSpreads": FragmentRefs<"TournamentEventList">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "eventCount"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TournamentEventList",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "eventCount"
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "events",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isLive",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PrematchEvent"
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
  "type": "Tournament",
  "abstractKey": null
};

(node as any).hash = "7d9f319e9dacca768195da9f50b5d8ce";

export default node;
