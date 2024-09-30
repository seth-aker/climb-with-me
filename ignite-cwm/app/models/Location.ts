import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const LocationModel = types
  .model("Location", {
    latitude: types.number,
    longitude: types.number,
  })
  .actions(withSetPropAction)

export interface ILocation extends Instance<typeof LocationModel> {}
export interface ILocationSnapshotOut extends SnapshotOut<typeof LocationModel> {}
export interface ILocationSnapshotIn extends SnapshotIn<typeof LocationModel> {}
