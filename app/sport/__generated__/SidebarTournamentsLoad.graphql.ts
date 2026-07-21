/**
 * @generated SignedSource<<66d0cd8f62f893709d106dec996ca3b6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarTournamentsLoad$variables = {
  id: string;
  open?: boolean | null | undefined;
};
export type SidebarTournamentsLoad$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"SidebarTournaments">;
  } | null | undefined;
};
export type SidebarTournamentsLoad = {
  response: SidebarTournamentsLoad$data;
  variables: SidebarTournamentsLoad$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "open"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SidebarTournamentsLoad",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "open",
                "variableName": "open"
              }
            ],
            "kind": "FragmentSpread",
            "name": "SidebarTournaments"
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "SidebarTournamentsLoad",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
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
          (v3/*:: as any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "condition": "open",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournaments",
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
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventConnection",
                        "kind": "LinkedField",
                        "name": "events",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                ]
              }
            ],
            "type": "Category",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "654068cd396bd19595be090598dfc966",
    "id": null,
    "metadata": {},
    "name": "SidebarTournamentsLoad",
    "operationKind": "query",
    "text": "query SidebarTournamentsLoad(\n  $open: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...SidebarTournaments_3Qbc3L\n    id\n  }\n}\n\nfragment SidebarTournaments_3Qbc3L on Category {\n  tournaments @include(if: $open) {\n    key\n    name\n    events {\n      totalCount\n    }\n    id\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "602b69ef6a9fd1aee0589d2737749803";

export default node;
