import { useContext } from 'react'
import { TokenContext } from '../context/TokenContext'

/**
 * 
 * @returns {TokenContext}
 * 
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