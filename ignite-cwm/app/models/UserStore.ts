import { types } from "mobx-state-tree";
import { ClimbingStyleModel } from "./ClimbingStyleModel";


export const UserStoreModel = types
    .model("UserStore", {
        /**
         * Users Full Name
         */
        name: types.string,
        /**
         * Users auth id 
         * AKA: sub
         */
        authId: types.string,
        /**
         * First Name
         */
        givenName: types.maybe(types.string),
        /**
         * Last Name
         */
        familyName: types.maybe(types.string),
        email: types.string,
        emailVerified: types.boolean,
        /**
         * User's date of birth
         */
        dob: types.Date,
        phoneNumber: types.maybe(types.string),
        phoneVerified: types.boolean,
        /**
         * User's identified gender
         */
        gender: types.maybe(types.string),
        /**
         * URI lookup to the profile picture or default image if none provided
         */
        profilePicture: types.string,
        /**
         * URI lookup to for the background image for the user
         */
        backgroundImage: types.string,
        /**
         * Still deciding whether to include this or not.
         * It can be important for climbing so partner's weight difference is not super drastic 
         * But it is a little uncomfortable to ask for. 
         */
        weightRange: types.maybe(types.string),
        /**
         * User's about me section.
         */
        aboutMeText: types.maybe(types.string),
        climbingStyles: types.array(ClimbingStyleModel)
    }).actions((store) => ({
        setName(name: string) {
            store.name = name;
        },
        setGivenName(givenName: string) {
            store.givenName = givenName;
        },
        setFamilyName(familyName: string) {
            store.familyName = familyName;
        },
        setDoB(dob: Date) {
            store.dob = dob;
        },
        setEmail(email: string) {
            store.email = email;
        },
        setEmailVerified(emailVerified: boolean) {
            store.emailVerified = emailVerified;
        },
        setPhoneNumber(phoneNumber: string) {
            store.phoneNumber = phoneNumber;
        },
        setPhoneVerified(phoneVerified: boolean) {
            store.phoneVerified = phoneVerified;
        },
        setGender(gender: string) {
            store.gender = gender;
        },
        setProfilePic(uri: string) {
            store.profilePicture = uri;
        },
        setBackgroundImg(uri: string) {
            store.backgroundImage = uri;
        },
        setAboutMeText(aboutMeText: string) {
            store.aboutMeText = aboutMeText;
        },
        

       
    }))

