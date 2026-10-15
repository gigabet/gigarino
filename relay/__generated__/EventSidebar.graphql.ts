/**
 * @generated SignedSource<<7c42158c79726cef9c9fcd6b4ad7f66d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebar$data = {
  readonly event: {
    readonly id: string;
    readonly tournament: {
      readonly " $fragmentSpreads": FragmentRefs<"EventSidebarTournament">;
    };
  } | null | undefined;
  readonly " $fragmentType": "EventSidebar";
};
export type EventSidebar$key = {
  readonly " $data"?: EventSidebar$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebar">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "eventId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebar",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "eventId"
        }
      ],
      "concreteType": "Event",
      "kind": "LinkedField",
      "name": "event",
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
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "tournament",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EventSidebarTournament"
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

(node as any).hash = "ce5a2d4f270ea748fd253ee3fe78647f";

export default node;
