import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export const MessageModel = types
.model("Message", {
  guid: types.identifier,
  /**
   * Guid of Sender
   */
  ownerId: "",
  /**
   * Name of the sender
   */
  ownerName: "",
  /**
   * Body of the message
   */
  body: "",
  /**
   * Time the message was sent
   */
  sentOn: types.Date,
  /**
   * Indicator of whether the message has been opened by the receiver
   */
  read: types.boolean

}).actions(withSetPropAction)

export interface IMessage extends Instance<typeof MessageModel> {};
export interface IMessageSnapshotIn extends SnapshotIn<typeof MessageModel> {};
export interface IMessageSnapshotOut extends SnapshotOut<typeof MessageModel> {};
