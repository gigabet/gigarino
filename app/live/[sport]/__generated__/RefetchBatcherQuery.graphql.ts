/**
 * @generated SignedSource<<32f2b1b9158f79844f904b451e6fa336>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RefetchBatcherQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type RefetchBatcherQuery$data = {
  readonly mockEventsByIds: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"liveEvent_Event">;
  }>;
};
export type RefetchBatcherQuery = {
  response: RefetchBatcherQuery$data;
  variables: RefetchBatcherQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "ids"
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
    "name": "RefetchBatcherQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": (v1/*:: as any*/),
            "concreteType": "MockEvent",
            "kind": "LinkedField",
            "name": "mockEventsByIds",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "liveEvent_Event"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "RefetchBatcherQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": (v1/*:: as any*/),
            "concreteType": "MockEvent",
            "kind": "LinkedField",
            "name": "mockEventsByIds",
            "plural": true,
            "selections": [
              (v2/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "league",
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
                "kind": "ScalarField",
                "name": "startTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MockOdds",
                "kind": "LinkedField",
                "name": "odds",
                "plural": false,
                "selections": [
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "draw",
                    "storageKey": null
                  },
                  (v2/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "147758be0b2296cf710fa999986e6f89",
    "id": null,
    "metadata": {},
    "name": "RefetchBatcherQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9711ed1ad2e00ac732ca52a8e36dd832";

export default node;
