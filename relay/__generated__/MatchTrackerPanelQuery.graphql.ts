/**
 * @generated SignedSource<<12ecd1fa2040f8ddfa36c966cc218093>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MatchTrackerPanelQuery$variables = {
  id: string;
};
export type MatchTrackerPanelQuery$data = {
  readonly event: {
    readonly MatchTrackerPanel: {
      readonly " $fragmentSpreads": FragmentRefs<"MatchTrackerPanel">;
    };
  } | null | undefined;
};
export type MatchTrackerPanelQuery = {
  response: MatchTrackerPanelQuery$data;
  variables: MatchTrackerPanelQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MatchTrackerPanelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "fragment": {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MatchTrackerPanel"
                }
              ],
              "type": "Event",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "MatchTrackerPanel"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "MatchTrackerPanelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "homeCompetitor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awayCompetitor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sportradarMatchId",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "7d4efe3b8a80876dbc748b4218d034ae",
    "id": null,
    "metadata": {},
    "name": "MatchTrackerPanelQuery",
    "operationKind": "query",
    "text": "query MatchTrackerPanelQuery(\n  $id: ID!\n) {\n  event(id: $id) {\n    ...MatchTrackerPanel\n    id\n  }\n}\n\nfragment MatchTracker on Event {\n  sportradarMatchId\n}\n\nfragment MatchTrackerPanel on Event {\n  homeCompetitor\n  awayCompetitor\n  ...MatchTracker\n}\n"
  }
};
})();

(node as any).hash = "97820eb9f3617a1c66f151bcec541372";

export default node;
