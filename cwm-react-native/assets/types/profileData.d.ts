
export type CWMUser = {
    auth_id: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified: boolean,
    date_of_birth: string,
    primary_phone: string,
    created_on: string,
    gender_code: string,
    is_active: boolean,
    picture_uri: string,
    addresses: UserAddress[],
    climbing_styles: ClimbingStyle[]
}

export type UserAddress = {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    country: string,
    isDefault: boolean
}

export type ClimbingStyle = {
    style_code: "s" | "b" | "t" | "r",
    experience_level: string,
    has_gear: boolean,
    preferred: boolean
}
