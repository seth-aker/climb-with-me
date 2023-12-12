import {createContext, ReactNode, useState} from 'react'
import { useAuth0 } from 'react-native-auth0'
import { Credentials } from 'react-native-auth0/lib/typescript/src/types'
type TokenContextProviderProps = {
    children: ReactNode
}

export type TokenContext = {
    accessToken: string | undefined,
    setAccessToken: (token: string | undefined) => void,
    getToken: () => Promise<string | undefined>
}

export const TokenContext = createContext({} as TokenContext)

export function TokenContextProvider({ children }: TokenContextProviderProps ) {
    const { getCredentials, authorize } = useAuth0()
    const [accessToken, setAccessToken] = useState<string | undefined>("");
    
    const getToken = async () => {
        const credentials =  await getCredentials(); 
        return credentials ? credentials.accessToken : undefined;
    }
    return <TokenContext.Provider 
                value={{
                    accessToken, 
                    setAccessToken,
                    getToken
                }}> 
                { children }
            </TokenContext.Provider>
}