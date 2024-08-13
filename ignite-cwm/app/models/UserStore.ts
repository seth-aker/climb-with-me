import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ClimbingStyleModel, IClimbingStyle } from "./ClimbingStyleModel"

import { withSetPropAction } from "./helpers/withSetPropAction"

export const UserStoreModel = types
  .model("UserStore", {
    /**
     * Users Full Name
     */
    name: types.maybe(types.string),
    /**
     * Users auth id
     * AKA: sub
     */
    authId: "",
    /**
     * First Name
     */
    givenName: types.maybe(types.string),
    /**
     * Last Name
     */
    familyName: types.maybe(types.string),
    email: types.maybe(types.string),
    emailVerified: types.optional(types.boolean, false),
    /**
     * User's date of birth
     */
    dob: types.maybe(types.Date),
    phoneNumber: types.maybe(types.string),
    phoneVerified: types.optional(types.boolean, false),
    /**
     * User's identified gender
     */
    gender: types.maybe(types.string),
    /**
     * URI lookup to the profile picture or default image if none provided
     */
    profileImg: types.maybe(types.string),
    /**
     * URI lookup to for the background image for the user
     */
    backgroundImg: types.maybe(types.string),
    /**
     * User's about me section.
     */
    aboutMeText: types.maybe(types.string),
    climbingStyles: types.optional(types.array(ClimbingStyleModel), []),

    state: types.optional(types.enumeration("State", ["pending", "success", "error"]), "pending"),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addClimbingStyle(climbingStyle: IClimbingStyle) {
      store.climbingStyles.push(climbingStyle)
    },
    removeClimbingStyle(climbingStyle: IClimbingStyle) {
      store.climbingStyles.remove(climbingStyle)
    },
  }))

export interface IUserStore extends Instance<typeof UserStoreModel> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export interface IUserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
