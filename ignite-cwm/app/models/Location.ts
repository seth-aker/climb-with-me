import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CoordinateModel = types
  .model("Coordinates", {
    latitude: types.number,
    longitude: types.number,
  })
  .actions(withSetPropAction)

export const LocationModel = types
  .model("Location", {
    coords: CoordinateModel,
    address: types.maybe(types.string),
    name: types.maybe(types.string),
  })
  .actions(withSetPropAction)

export interface ILocation extends Instance<typeof LocationModel> {}
export interface ILocationSnapshotOut extends SnapshotOut<typeof LocationModel> {}
export interface ILocationSnapshotIn extends SnapshotIn<typeof LocationModel> {}
