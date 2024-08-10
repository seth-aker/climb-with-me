import validator from "validator"
import isDate from "./isDate"

const inputNotEmpty = (input: string) => {
    return !input && input.length !== 0
}

const isEmail = validator.isEmail

/**
 * Checks input date against current time and calculates whether user is younger than 18
 * @param birthDate 
 * @returns boolean
 */
const isOver18 = (birthDate: Date) => {
    return (new Date().getTime() - birthDate.getTime() < (1000 * 3600 * 24 * 365 * 18))
}

const isPhoneNumber = validator.isMobilePhone;

const validateProfiles = {
    inputNotEmpty,
    isEmail,
    isOver18,
    isPhoneNumber,
    isDate
}

export default validateProfiles;

