/**
 * @generated SignedSource<<7aeeec5febcc54dd8399fe0a30684624>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TicketHistoryList$data = {
  readonly myTickets: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly resettled: boolean;
        readonly status: TicketStatus;
        readonly " $fragmentSpreads": FragmentRefs<"TicketHistoryDetails" | "TicketRow">;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "TicketHistoryList";
};
export type TicketHistoryList$key = {
  readonly " $data"?: TicketHistoryList$data;
  readonly " $fragmentSpreads": FragmentRefs<"TicketHistoryList">;
};

import TicketHistoryListPaginationQuery_graphql from './TicketHistoryListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "myTickets"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*:: as any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*:: as any*/)
      },
      "fragmentPathInResult": [],
      "operation": TicketHistoryListPaginationQuery_graphql
    }
  },
  "name": "TicketHistoryList",
  "selections": [
    {
      "alias": "myTickets",
      "args": null,
      "concreteType": "TicketConnection",
      "kind": "LinkedField",
      "name": "__TicketHistoryList_myTickets_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TicketEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Ticket",
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
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "resettled",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TicketRow"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TicketHistoryDetails"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
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
})();

(node as any).hash = "139e1048f14dcb09682fe4ae7be5682e";

export default node;
