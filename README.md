# Climb With Me

Find your next climbing partner

## React Native + Java SpringBoot
Currently a WIP app. Using [Ignite Framework](https://docs.infinite.red/ignite-cli/) on top of [Expo](https://expo.dev/) for the front end stucture. 

Java SpringBoot for the back end connected to a PostgreSQL server.

For user authorization, currently connected to [Auth0](https://auth0.com/docs)


```

### Auth0 User Data (for reference)

| Name                  | Data Type  | Required? |
| --------------------- | ---------- | --------- |
| app_metadata          | dictionary | Yes       |
| created_at            | string     | Yes       |
| email                 | string     | No        |
| email_verified        | boolean    | Yes       |
| family_name           | string     | No        |
| given_name            | string     | No        |
| last_password_reset   | string     | No        |
| name                  | string     | No        |
| nickname              | string     | No        |
| phone_number          | string     | No        |
| phone_number_verified | boolean    | No        |
| picture               | string     | No        |
| updated_at            | string     | Yes       |
| user_id               | string     | No        |
| user_metadata         | Dictionary | Yes       |
| username              | string     | No        |
