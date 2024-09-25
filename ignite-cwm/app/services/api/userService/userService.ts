import { IUserStoreSnapshotOut } from "app/models/UserStore"
import api from "../api"
import * as FileSystem from "expo-file-system"
import { AxiosResponse } from "axios"
import Config from "app/config"
// post to /api/v1/users
export const postUser = async (user: IUserStoreSnapshotOut, token: string) => {
  const response: AxiosResponse<IUserStoreSnapshotOut> = await api.post("/users", user, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.status !== 204 && response.status !== 200) {
    throw Error("Error status: " + response.status + ": " + response.statusText)
  }
  return response
}

// get from api/v1/users/public/:id
export const getUserPublic = async (
  userId: string,
  token: string,
): Promise<AxiosResponse<IUserStoreSnapshotOut>> => {
  const response: AxiosResponse<IUserStoreSnapshotOut> = await api.get(`/users/public/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}
export const getUserPrivate = async (
  userId: string,
  token: string,
): Promise<AxiosResponse<IUserStoreSnapshotOut>> => {
  const response: AxiosResponse<IUserStoreSnapshotOut> = await api.get(`/users/private/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}
// put to api/v1/users/:id
export const updateUser = async (user: IUserStoreSnapshotOut, token: string) => {
  console.log(user)
  const response: AxiosResponse<IUserStoreSnapshotOut> = await api.put(`/users/${user._id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

export const postAvatar = async (
  userId: string,
  localUri: string,
  uri: string,
  token: string,
  mimeType?: string,
) => {
  try {
    await FileSystem.uploadAsync(
      `${Config.API_URL}/users/${userId}/img?type=profile&resourceUri=${uri}`,
      localUri,
      {
        headers: { Authorization: `Bearer ${token}` },
        fieldName: "profile",
        mimeType,
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      },
    )
  } catch (e) {
    console.log("Error")
    console.log(e)
  }
}
export const postBackgroundImg = async (
  userId: string,
  localUri: string,
  token: string,
  mimeType?: string,
) => {
  try {
    await FileSystem.uploadAsync(
      `${Config.API_URL}/users/${userId}/img?type=background`,
      localUri,
      {
        headers: { Authorization: `Bearer ${token}` },
        fieldName: "background",
        mimeType,
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      },
    )
  } catch (e) {
    console.log("Error")
    console.log(e)
  }
}
