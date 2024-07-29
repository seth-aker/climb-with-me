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
   * List of Guids of the users who have viewed the message
   */
  readBy: types.array(types.string) 

}).actions(withSetPropAction)

export interface IMessage extends Instance<typeof MessageModel> {};
export interface IMessageSnapshotIn extends SnapshotIn<typeof MessageModel> {};
export interface IMessageSnapshotOut extends SnapshotOut<typeof MessageModel> {};
