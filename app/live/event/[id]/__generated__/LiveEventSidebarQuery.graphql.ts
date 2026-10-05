/**
 * @generated SignedSource<<bf5dd229064eb093c7c7f66c3b4722c5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventSidebarQuery$variables = Record<PropertyKey, never>;
export type LiveEventSidebarQuery$data = {
  readonly liveEvents: ReadonlyArray<{
    readonly tournament: {
      readonly " $fragmentSpreads": FragmentRefs<"LiveStripTournament">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"LiveEventStrip" | "LiveOrder">;
  }>;
};
export type LiveEventSidebarQuery = {
  response: LiveEventSidebarQuery$data;
  variables: LiveEventSidebarQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = [
  (v2/*:: as any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v2/*:: as any*/),
    (v0/*:: as any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveEventSidebarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LiveEvent",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": true,
        "selections": [
          {
            "kind": "InlineDataFragmentSpread",
            "name": "LiveOrder",
            "selections": [
              (v0/*:: as any*/),
              (v1/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sport",
                "kind": "LinkedField",
                "name": "sport",
                "plural": false,
                "selections": (v3/*:: as any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournament",
                "plural": false,
                "selections": (v3/*:: as any*/),
                "storageKey": null
              }
            ],
            "args": null,
            "argumentDefinitions": []
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LiveEventStrip"
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
                "name": "LiveStripTournament"
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
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LiveEventSidebarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LiveEvent",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": true,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v0/*:: as any*/),
              (v5/*:: as any*/),
              (v4/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "category",
                "plural": false,
                "selections": [
                  (v5/*:: as any*/),
                  (v0/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tradingStatus",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "period",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockRunning",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockElapsedSeconds",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clockAnchorAt",
            "storageKey": null
          },
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
            "name": "homeImageUrl",
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
            "name": "awayImageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "homeScore",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awayScore",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "groups",
                "value": [
                  "MAIN"
                ]
              }
            ],
            "concreteType": "Market",
            "kind": "LinkedField",
            "name": "markets",
            "plural": true,
            "selections": [
              (v0/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Outcome",
                "kind": "LinkedField",
                "name": "outcomes",
                "plural": true,
                "selections": [
                  (v0/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "index",
                    "storageKey": null
                  },
                  (v5/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "markets(groups:[\"MAIN\"])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d29c75620481e22ab98c2db16eca6997",
    "id": null,
    "metadata": {},
    "name": "LiveEventSidebarQuery",
    "operationKind": "query",
    "text": "query LiveEventSidebarQuery {\n  liveEvents {\n    ...LiveOrder\n    ...LiveEventStrip\n    tournament {\n      ...LiveStripTournament\n      id\n    }\n    id\n  }\n}\n\nfragment LiveEventStrip on LiveEvent {\n  id\n  tradingStatus\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...LiveStripOdds\n}\n\nfragment LiveOrder on LiveEvent {\n  id\n  startTime\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on LiveEvent {\n  homeScore\n  awayScore\n}\n\nfragment LiveStripMarket on Market {\n  outcomes {\n    id\n    index\n    ...LiveStripOdd\n  }\n}\n\nfragment LiveStripOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment LiveStripOdds on LiveEvent {\n  tradingStatus\n  markets(groups: [MAIN]) {\n    id\n    kind\n    ...LiveStripMarket\n  }\n}\n\nfragment LiveStripTournament on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    id\n  }\n}\n\nfragment LiveTeams on LiveEvent {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on LiveEvent {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n}\n"
  }
};
})();

(node as any).hash = "f35652a0634bab9fbc576f934a415335";

export default node;
