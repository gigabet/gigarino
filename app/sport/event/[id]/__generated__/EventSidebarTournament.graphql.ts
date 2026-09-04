/**
 * @generated SignedSource<<22a0cf08d17989d30ba709578c10cc23>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarTournament$data = {
  readonly events: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"EventStripCard">;
      };
    }>;
  };
  readonly id: string;
  readonly name: string;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "EventSidebarTournament";
};
export type EventSidebarTournament$key = {
  readonly " $data"?: EventSidebarTournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebarTournament">;
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebarTournament",
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
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
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
              "concreteType": "PrematchEvent",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*:: as any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "EventStripCard"
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
})();

(node as any).hash = "cfb372c7c307d8e5858bb1a9bd07d6c2";

export default node;
