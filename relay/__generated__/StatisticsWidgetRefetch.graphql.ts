/**
 * @generated SignedSource<<75da98468fecbef4a40703894e29989a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetRefetch$variables = {
  id: string;
};
export type StatisticsWidgetRefetch$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidget">;
  } | null | undefined;
};
export type StatisticsWidgetRefetch = {
  response: StatisticsWidgetRefetch$data;
  variables: StatisticsWidgetRefetch$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competition",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outcome",
  "storageKey": null
},
v9 = [
  (v2/*:: as any*/),
  (v3/*:: as any*/),
  (v4/*:: as any*/),
  (v5/*:: as any*/),
  (v6/*:: as any*/),
  (v7/*:: as any*/),
  (v8/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StatisticsWidgetRefetch",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StatisticsWidget"
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
    "name": "StatisticsWidgetRefetch",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
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
                "concreteType": "MatchInsights",
                "kind": "LinkedField",
                "name": "insights",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "homePosition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "awayPosition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "venue",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "referee",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "round",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MatchStat",
                    "kind": "LinkedField",
                    "name": "stats",
                    "plural": true,
                    "selections": [
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
                        "name": "home",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "away",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PastMatch",
                    "kind": "LinkedField",
                    "name": "homeRecent",
                    "plural": true,
                    "selections": (v9/*:: as any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PastMatch",
                    "kind": "LinkedField",
                    "name": "awayRecent",
                    "plural": true,
                    "selections": (v9/*:: as any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PastMatch",
                    "kind": "LinkedField",
                    "name": "headToHead",
                    "plural": true,
                    "selections": [
                      (v8/*:: as any*/),
                      (v2/*:: as any*/),
                      (v3/*:: as any*/),
                      (v4/*:: as any*/),
                      (v5/*:: as any*/),
                      (v6/*:: as any*/),
                      (v7/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "411e210005d3ce76868cd533f3462311",
    "id": null,
    "metadata": {},
    "name": "StatisticsWidgetRefetch",
    "operationKind": "query",
    "text": "query StatisticsWidgetRefetch(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...StatisticsWidget\n    id\n  }\n}\n\nfragment StatisticsWidget on Event {\n  id\n  status\n  homeCompetitor\n  awayCompetitor\n  insights {\n    homePosition\n    awayPosition\n    venue\n    referee\n    round\n    stats {\n      key\n      home\n      away\n    }\n    homeRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    awayRecent {\n      ...StatisticsWidgetPastMatch\n    }\n    headToHead {\n      outcome\n      ...StatisticsWidgetPastMatch\n    }\n  }\n}\n\nfragment StatisticsWidgetPastMatch on PastMatch {\n  homeName\n  awayName\n  homeScore\n  awayScore\n  competition\n  startTime\n  outcome\n}\n"
  }
};
})();

(node as any).hash = "0ac2c4ceab42994396616327e5c313c9";

export default node;
