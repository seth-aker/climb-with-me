# Climb With Me

Find your next climbing partner

## React Native + Express + MongoDB

Currently a WIP app. Using [Ignite Framework](https://docs.infinite.red/ignite-cli/) on top of [Expo](https://expo.dev/) for the front end structure.

Using Express + MongoDB for the backend database.

For user authorization, currently connected to [Auth0](https://auth0.com/docs)

## Setup instructions

- Create a .env file in the dev-cwm-api folder.
- Run `npm install` in the dev-cwm-api folder
- Boot the api with `npm run dev`

  ```
   ATLAS_URI=[YOUR ATLAS URI]
   PORT=[YOUR API PORT]

  ```

- Run `npm install` in the ignite-cwm folder
- Run the app with `npx expo run:android` or `npx expo run:ios` (assuming you have an emulator installed on your computer. If not you will need to build using [EAS](https://docs.expo.dev/build/introduction/))
