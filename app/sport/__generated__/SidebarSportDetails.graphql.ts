/**
 * @generated SignedSource<<1c1f866f96ef09bf936afc6b19a0bffb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarSportDetails$variables = {
  key?: string | null | undefined;
};
export type SidebarSportDetails$data = {
  readonly sport: {
    readonly " $fragmentSpreads": FragmentRefs<"SidebarCountryList">;
  } | null | undefined;
};
export type SidebarSportDetails = {
  response: SidebarSportDetails$data;
  variables: SidebarSportDetails$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "key"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SidebarSportDetails",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "sport",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SidebarCountryList"
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
    "name": "SidebarSportDetails",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "sport",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "categories",
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
                "name": "eventCount",
                "storageKey": null
              },
              (v2/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "countryCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b445dea556315e3e1645a93ffe5ee459",
    "id": null,
    "metadata": {},
    "name": "SidebarSportDetails",
    "operationKind": "query",
    "text": "query SidebarSportDetails(\n  $key: String\n) {\n  sport(key: $key) {\n    ...SidebarCountryList\n    id\n  }\n}\n\nfragment SidebarCountryItem on Category {\n  id\n  key\n  countryCode\n  name\n  ...SidebarTournaments\n}\n\nfragment SidebarCountryList on Sport {\n  categories {\n    key\n    eventCount\n    ...SidebarCountryItem\n    id\n  }\n}\n\nfragment SidebarTournaments on Category {\n  id\n}\n"
  }
};
})();

(node as any).hash = "add7c7a3493fa297ee75253a41c3dafa";

export default node;
