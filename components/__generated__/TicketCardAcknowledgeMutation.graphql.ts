/**
 * @generated SignedSource<<af70c94e2b913ca9d8d58e8fa2d224a9>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TicketCardAcknowledgeMutation$variables = {
  ticketIds?: ReadonlyArray<string> | null | undefined;
};
export type TicketCardAcknowledgeMutation$data = {
  readonly acknowledgeResettlements: ReadonlyArray<{
    readonly id: string;
    readonly resettlementSeen: boolean;
  }>;
};
export type TicketCardAcknowledgeMutation = {
  response: TicketCardAcknowledgeMutation$data;
  variables: TicketCardAcknowledgeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ticketIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ticketIds",
        "variableName": "ticketIds"
      }
    ],
    "concreteType": "Ticket",
    "kind": "LinkedField",
    "name": "acknowledgeResettlements",
    "plural": true,
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
        "name": "resettlementSeen",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketCardAcknowledgeMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "TicketCardAcknowledgeMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "077e4147da7ebce3f225403ecb70a851",
    "id": null,
    "metadata": {},
    "name": "TicketCardAcknowledgeMutation",
    "operationKind": "mutation",
    "text": "mutation TicketCardAcknowledgeMutation(\n  $ticketIds: [ID!]\n) {\n  acknowledgeResettlements(ticketIds: $ticketIds) {\n    id\n    resettlementSeen\n  }\n}\n"
  }
};
})();

(node as any).hash = "320c898ef4da66fa2a2bb09ca4371d3a";

export default node;
