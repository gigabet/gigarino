/**
 * @generated SignedSource<<4beb1973aff0d1163c34101e2c3c848f>>
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
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
                      (v4/*:: as any*/),
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
                          (v4/*:: as any*/),
                          (v3/*:: as any*/)
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
    "cacheID": "3f5b2e7784c8105967196dc29bf3b621",
    "id": null,
    "metadata": {},
    "name": "SidebarTournamentsLoad",
    "operationKind": "query",
    "text": "query SidebarTournamentsLoad(\n  $open: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...SidebarTournaments_3Qbc3L\n    id\n  }\n}\n\nfragment SidebarTournaments_3Qbc3L on Category {\n  tournaments @include(if: $open) {\n    key\n    name\n    sport {\n      key\n      id\n    }\n    id\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "8568e75163530815a784f64680044b86";

export default node;
