/**
 * @generated SignedSource<<39bcc968bf2843dfc03757e98c294a9d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSportTabs$data = {
  readonly liveEvents: {
    readonly totalCount: number;
  };
  readonly sports: ReadonlyArray<{
    readonly key: string;
    readonly liveEventCount: number;
    readonly name: string;
  }>;
  readonly " $fragmentType": "LiveSportTabs";
};
export type LiveSportTabs$key = {
  readonly " $data"?: LiveSportTabs$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSportTabs">;
};

import LiveSportTabsRefetch_graphql from './LiveSportTabsRefetch.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": LiveSportTabsRefetch_graphql
    }
  },
  "name": "LiveSportTabs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "liveEvents",
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
    {
      "alias": null,
      "args": null,
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sports",
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
          "kind": "ScalarField",
          "name": "liveEventCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "351e17778caa20d2d118cc3b0947cfd5";

export default node;
