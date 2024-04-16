import { useContext } from 'react'
import { TokenContext } from '../context/TokenContext'

/**
 * 
 * @returns {TokenContext}
 * For easy access to retrieve access tokens from Auth0. Uses auth0 function 'getCredentials()'
 * ```ts
 * const {
 * // State
 * accessToken,
 * //Method
 * setAccessToken
 * } = useToken();
 * ```
 */
export function useToken(): TokenContext {
    return useContext(TokenContext);
}