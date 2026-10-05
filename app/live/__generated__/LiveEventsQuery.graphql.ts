/**
 * @generated SignedSource<<f7c4b53878f4af919d778b0ddc1703df>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventsQuery$variables = Record<PropertyKey, never>;
export type LiveEventsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventList">;
};
export type LiveEventsQuery = {
  response: LiveEventsQuery$data;
  variables: LiveEventsQuery$variables;
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
  "name": "key",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v1/*:: as any*/),
    (v0/*:: as any*/)
  ],
  "storageKey": null
},
v3 = {
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
    "name": "LiveEventsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "LiveEventList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LiveEventsQuery",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startTime",
            "storageKey": null
          },
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
              (v0/*:: as any*/),
              (v3/*:: as any*/),
              (v2/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "category",
                "plural": false,
                "selections": [
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "countryCode",
                    "storageKey": null
                  },
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
            "args": null,
            "kind": "ScalarField",
            "name": "tradingStatus",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "oddCount",
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
            "name": "homeImageUrl",
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
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
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
                      (v3/*:: as any*/),
                      (v1/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "price",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": "__isEvent"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2f052201217fda2c1921c3d979f3f4fc",
    "id": null,
    "metadata": {},
    "name": "LiveEventsQuery",
    "operationKind": "query",
    "text": "query LiveEventsQuery {\n  ...LiveEventList\n}\n\nfragment ListViewMarket on Market {\n  outcomes {\n    id\n    index\n    name\n    key\n    price\n  }\n}\n\nfragment ListViewMarkets on Event {\n  __isEvent: __typename\n  markets {\n    id\n    kind\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on LiveEvent {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n}\n\nfragment LiveEventList on Query {\n  liveEvents {\n    ...LiveOrder\n    ...LiveEvent\n    tournament {\n      ...LiveTournament\n      id\n    }\n    id\n  }\n}\n\nfragment LiveOrder on LiveEvent {\n  id\n  startTime\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on LiveEvent {\n  homeScore\n  awayScore\n}\n\nfragment LiveTeams on LiveEvent {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on LiveEvent {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n}\n\nfragment LiveTournament on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    countryCode\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f798315e1a9f9e3a5752553a5573af42";

export default node;
