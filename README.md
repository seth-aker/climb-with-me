# Climb With Me

Find your next climbing partner

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

_There are more properties but these are the ones we care about_

| Name           | Data Type | Required? |
| -------------- | --------- | --------- |
| user_id        | string    | Yes       |
| created_at     | string    | Yes       |
| email          | string    | No        |
| email_verified | boolean   | Yes       |
| family_name    | string    | No        |
| given_name     | string    | No        |
| phone_number   | string    | No        |
| picture        | string    | No        |
| updated_at     | string    | Yes       |
