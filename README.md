# Climb With Me

Find your next climbing partner

## React Native + Express + MongoDB

Currently a WIP app. Using [Ignite Framework](https://docs.infinite.red/ignite-cli/) on top of [Expo](https://expo.dev/) for the front end structure.

Using Express + MongoDB for the backend database.

For user authorization, currently connected to [Auth0](https://auth0.com/docs)

## Setup instructions

- Create a .env file in the dev-cwm-api folder.

  ```
   ATLAS_URI=[YOUR ATLAS URI]
   PORT=[YOUR API PORT]
   AWS_REGION=[YOUR REGION]
   AWS_BUCKET=[YOUR S3 Bucket]
   AWS_ACCESS_KEY=[IAM account access key for dev environment]
   AWS_SECRET_ACCESS_KEY=[IAM account secret access key for dev environment]
  ```

- Run `npm install` in the dev-cwm-api folder
- Run `npm install` in the ignite-cwm folder

- Boot the api with `npm run dev`
- Build the app with `npx expo run:android` or `npx expo run:ios` (assuming you have an emulator installed on your computer. If not you will need to build using [EAS](https://docs.expo.dev/build/introduction/))
- Alternatively press `ctl + shift + B` to start both as tasks (after you have npm installed)
