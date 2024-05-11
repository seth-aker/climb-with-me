import { createContext, ReactNode, useState } from "react";
import { Address, Gender } from "../assets/types/registration";

type RegistrationContextProviderProps = {
    children: ReactNode
}



export type RegistrationContext = {
    email: string,
    setEmail: (input: string) => void,
    
    firstName: string,
    setFirstName: (input: string) => void,
    
    lastName: string,
    setLastName: (input: string) => void,

    dateOfBirth: Date,
    setDateOfBirth: (input: Date) => void,

    primaryPhone: number,
    setPrimaryPhone: (input: number) => void,

    gender: Gender | undefined,
    setGender: (input: Gender) => void,

    address: Address | undefined,
    setAddress: (input: Address | undefined) => void

}

export const RegistrationContext = createContext({} as RegistrationContext)

export function RegistrationContextProvider({ children }: RegistrationContextProviderProps ) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [primaryPhone, setPrimaryPhone] = useState(0);
    const [gender, setGender] = useState<Gender>()
    const [address, setAddress] = useState<Address>();

    return (<RegistrationContext.Provider 
                value={{
                    email,
                    setEmail,
                    firstName,
                    setFirstName,
                    lastName,
                    setLastName,
                    dateOfBirth,
                    setDateOfBirth,
                    primaryPhone,
                    setPrimaryPhone,
                    gender,
                    setGender,
                    address,
                    setAddress
                }}>
                    { children }
                </RegistrationContext.Provider>
    )
}