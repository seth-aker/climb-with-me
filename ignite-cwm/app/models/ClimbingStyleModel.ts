import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ClimbingStyleModel = types.model("ClimbingStyle", {
  style: types.enumeration(["Sport Climbing", "Bouldering", "Trad Climbing", "Top Rope"]),
  maxGradeIndoor: types.maybe(types.string),
  maxGradeOutdoor: types.maybe(types.string),
  yearsExp: types.maybe(types.string),
})

export interface IClimbingStyle extends Instance<typeof ClimbingStyleModel> {}
export interface IClimbingStyleSnapshotIn extends SnapshotIn<typeof ClimbingStyleModel> {}
export interface IClimbingStyleSnapshotOut extends SnapshotOut<typeof ClimbingStyleModel> {}
