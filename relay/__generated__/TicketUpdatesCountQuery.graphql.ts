/**
 * @generated SignedSource<<87ddaf05e3786e7a0175ea96946abb72>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TicketUpdatesCountQuery$variables = Record<PropertyKey, never>;
export type TicketUpdatesCountQuery$data = {
  readonly unseenResettlementCount: number;
};
export type TicketUpdatesCountQuery = {
  response: TicketUpdatesCountQuery$data;
  variables: TicketUpdatesCountQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "unseenResettlementCount",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketUpdatesCountQuery",
    "selections": (v0/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TicketUpdatesCountQuery",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "6fd3440a0d98a2b170c900c79fa6c824",
    "id": null,
    "metadata": {},
    "name": "TicketUpdatesCountQuery",
    "operationKind": "query",
    "text": "query TicketUpdatesCountQuery {\n  unseenResettlementCount\n}\n"
  }
};
})();

(node as any).hash = "d93f2584967a0bb76b803d8a46c95ffe";

export default node;
