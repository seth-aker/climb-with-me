export type AppUser = {
    username?: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: boolean,
    dateOfBirth: Date,
    primaryPhone: number,
    genderCode?: Gender,
    picture: string
    address?: Address
}

export type Address = {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    stateProvince: string,
    postalCode: number,
    country: string,
    isDefault: boolean
}

/**
 * m: Male,
 * f: Female,
 * n: non-binary,
 * d: decline to say,
 * o: other
 */
export type Gender = "m" | "f" | "n" | "d" | "o";


