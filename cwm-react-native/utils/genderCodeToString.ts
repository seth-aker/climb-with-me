export default function genderCodeToString(genderCode: string) {
    switch (genderCode) {
        case 'm':
            return "Male";
        case 'f': 
            return "Female";
        case 'n': 
            return "Non-binary";
        case 'o':
            return "Other";
        default:
            return "I'd rather not say";
    }
}