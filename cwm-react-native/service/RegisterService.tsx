//TODO: create a type user info for better ts compilation 
export async function registerUser(token: string, user: {}, ) {
    const response = await fetch('http://localhost:8080/register', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Bearer: token
        },
        body: JSON.stringify({
            user
        }),
    }).then((resp) => resp.json());

    return response.body;
};