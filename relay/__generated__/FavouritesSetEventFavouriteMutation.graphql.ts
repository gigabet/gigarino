/**
 * @generated SignedSource<<9a808441c0c390a68537a6761f73ae42>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FavouritesSetEventFavouriteMutation$variables = {
  eventId: string;
  favourite: boolean;
};
export type FavouritesSetEventFavouriteMutation$data = {
  readonly setEventFavourite: {
    readonly id: string;
    readonly isFavourite: boolean;
    readonly isLive: boolean;
  };
};
export type FavouritesSetEventFavouriteMutation = {
  response: FavouritesSetEventFavouriteMutation$data;
  variables: FavouritesSetEventFavouriteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "favourite"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "favourite",
        "variableName": "favourite"
      }
    ],
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "setEventFavourite",
    "plural": false,
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
        "name": "isFavourite",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isLive",
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
    "name": "FavouritesSetEventFavouriteMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "FavouritesSetEventFavouriteMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "1a4b64279cad1cccc1fe938aa7a2de18",
    "id": null,
    "metadata": {},
    "name": "FavouritesSetEventFavouriteMutation",
    "operationKind": "mutation",
    "text": "mutation FavouritesSetEventFavouriteMutation(\n  $eventId: ID!\n  $favourite: Boolean!\n) {\n  setEventFavourite(eventId: $eventId, favourite: $favourite) {\n    id\n    isFavourite\n    isLive\n  }\n}\n"
  }
};
})();

(node as any).hash = "3d0215c100e11c485152aec88f46d59c";

export default node;
