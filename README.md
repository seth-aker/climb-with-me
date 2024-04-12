# Climb With Me

Find your next climbing partner

## Backlog:

### Backend

- Basic CRUD operations for the Postgres Database
- Data scrubbing before calling stored procedures
- Set Up controllers for the API calls.
- Develop chat feature using web sockets
- Develop Algorithm for finding partner matches.

### Front End

- Improve design and css
- Connect to API calls
- Implement Chat features for the front end
- A lot of design and implementation that I am too lazy to write up at this point

## Dev Note for Auth

This code will run each time a new user signs up.

_Note: This will only be done when the API is running in production_

```
const axios = require("axios")

exports.onExecutePostUserRegistration = async (event, api) => {
    const tokenRequest = {
        audience: "http://localhost:8080",
        grant_type: "client_credentials",
        client_id: event.secrets.CLIENT_ID,
        client_secret: event.secrets.CLIENT_SECRET
    }
    const tokenResponse = await axios.post(
        "https://dev-sethaker.us.auth0.com/oauth/token",
        tokenRequest,
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    )

    const token = tokenResponse.data.access_token;

    const userInfo = {
        user: event.user
    }

    const config = {
        headers: {'content-type': 'application/json', authorization: `Bearer ${token}`}
    }

    await axios.post("http://localhost:8080/api/register/new_user", userInfo, config)
};

```

### Auth0 User Data

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
