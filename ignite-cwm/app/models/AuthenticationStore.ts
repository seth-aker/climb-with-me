import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { Credentials, User } from "react-native-auth0";



export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    tokenLoading: true,
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((store) => {
    function setAuthToken(value?: string) {
      store.authToken = value
    }

    function setTokenLoading(bool: boolean) {
      store.tokenLoading = bool;
    }
    const updateAndValidateToken = flow(function* (getCredentials: () => Promise<Credentials | undefined>) {
      try {
        setTokenLoading(true);
        const credentials: Credentials | undefined = yield getCredentials();
        if(__DEV__) {
          console.tron.log(`Credentials: ${credentials?.accessToken}`)
        }
        setAuthToken(credentials ? credentials.accessToken : undefined)
        setTokenLoading(false)
      } catch (err) {
        console.log("Failed to connect to Auth0", err)
      }
    })
    function logout() {
      store.authToken = undefined
      // store.authEmail = ""
    }

  
    return {
      setAuthToken,
      updateAndValidateToken,
      logout,
      
    }
  });

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
