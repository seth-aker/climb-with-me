import { useContext } from 'react';
import { RegistrationContext } from '../context/RegistrationContext';

/**
 * @returns {RegistrationContext}
 * ```ts
 * const {
 * //state
 * email: string,
 * firstName: string,
 * lastName: string,
 * dateOfBirth: Date,
 * primaryPhone: number,
 * gender: string,
 * address: Address
 * 
 * //Methods
 * setEmail,
 * setFirstName,
 * setLastName,
 * setDateOfBirth,
 * setPrimaryPhone,
 * setGender,
 * setAddress
 * } = useRegistrationContext();
 * ```
 */
export default function useRegistrationContext(): RegistrationContext {
    return useContext(RegistrationContext);
}