import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree";
import { ClimbingStyleModel, IClimbingStyle } from "./ClimbingStyleModel";
import { api } from "app/services/api";
import { ApiResponse } from "apisauce";


export const UserStoreModel = types
    .model("UserStore", {
        /**
         * Users Full Name
         */
        name: types.maybe(types.string),
        /**
         * Users auth id 
         * AKA: sub
         */
        authId: types.maybe(types.string),
        /**
         * First Name
         */
        givenName: types.maybe(types.string),
        /**
         * Last Name
         */
        familyName: types.maybe(types.string),
        email: types.maybe(types.string),
        emailVerified: types.optional(types.boolean, false),
        /**
         * User's date of birth
         */
        dob: types.maybe(types.Date),
        phoneNumber: types.maybe(types.string),
        phoneVerified: types.optional(types.boolean, false),
        /**
         * User's identified gender
         */
        gender: types.maybe(types.string),
        /**
         * URI lookup to the profile picture or default image if none provided
         */
        profileImg: types.maybe(types.string),
        /**
         * URI lookup to for the background image for the user
         */
        backgroundImg: types.maybe(types.string),
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
        climbingStyles: types.optional(types.array(ClimbingStyleModel), []),

        state: types.optional(types.enumeration("State", ["pending", "success", "error"]), "pending"),

    }).actions((store) => ({
        setName(name?: string) {
            store.name = name;
        },
        setGivenName(givenName?: string) {
            store.givenName = givenName;
        },
        setFamilyName(familyName?: string) {
            store.familyName = familyName;
        },
        setDoB(dob?: Date) {
            store.dob = dob;
        },
        setEmail(email?: string) {
            store.email = email;
        },
        setEmailVerified(emailVerified: boolean) {
            store.emailVerified = emailVerified;
        },
        setPhoneNumber(phoneNumber?: string) {
            store.phoneNumber = phoneNumber;
        },
        setPhoneVerified(phoneVerified: boolean) {
            store.phoneVerified = phoneVerified;
        },
        setGender(gender?: string) {
            store.gender = gender;
        },
        setProfileImg(uri?: string) {
            store.profileImg = uri;
        },
        setBackgroundImg(uri?: string) {
            store.backgroundImg = uri;
        },
        setWeightRange(range?: string) {
            store.weightRange = range;
        },
        setAboutMeText(aboutMeText?: string) {
            store.aboutMeText = aboutMeText;
        },
        addClimbingStyle(climbingStyle: IClimbingStyle) {
            store.climbingStyles.push(climbingStyle);
        },
        removeClimbingStyle(climbingStyle: IClimbingStyle) {
            store.climbingStyles.remove(climbingStyle)
        },

        /**
         * Takes the sub (the user's guid) from an Auth0 user obj and their auth token to load their data from the backend.
         */
        getUser: flow(function* getUser(sub: string, token: string) {
            // TODO: Reset the store here
            
            store.state = "pending";
            api.apisauce.setHeader("Bearer", token)
            try {
                const response: ApiResponse<IUserStore> = yield api.apisauce.get(`/users/${sub}`)
                const user = response.data;
                if(user) {
                    store = user;
                    store.state = "success"
                } else {
                    store.state = "error"
                }

            } catch (error) {
                if(error instanceof Error) {
                    console.log(error.message)
                }
                store.state = "error"
            }
        }),

        setUser(user: IUser ) {
            store.name = user.name;
            store.givenName = user.givenName
            store.familyName = user.familyName
            store.dob = user.dob
            store.email = user.email
            store.emailVerified = user.emailVerified
            store.phoneNumber = user.phoneNumber
            store.phoneVerified = user.phoneVerified
            store.gender = user.gender
            store.profileImg = user.profileImg
            store.backgroundImg = user.backgroundImg
            store.aboutMeText = user.aboutMeText
            store.weightRange = user.weightRange
            // user.climbingStyles?.forEach((style) => {
            //     store.climbingStyles.push(style)
            // })
            store.state = "success"
        }

    }))

export interface IUserStore extends Instance<typeof UserStoreModel> {};
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {};
export interface IUserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {};

export interface IUser {
    name: string | undefined,
    authId: string | undefined,
    givenName: string | undefined,
    familyName: string | undefined,
    email: string | undefined,
    emailVerified: boolean,
    phoneNumber: string | undefined,
    phoneVerified: boolean,
    dob: Date | undefined,
    profileImg: string | undefined,
    backgroundImg: string | undefined,
    weightRange: string | undefined,
    aboutMeText: string | undefined,
    gender: string | undefined,
    climbingStyles: IClimbingStyle[],
    state: string | undefined
}