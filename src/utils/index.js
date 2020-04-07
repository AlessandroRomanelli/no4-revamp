import axios from "axios";

const url = Boolean(window.location.port) && window.location.hostname === "localhost" ? "http://localhost:3000" : window.location.origin;

export async function login(email, password) {
    const { data: { data: { authenticateUserWithPassword } } } = await axios.post(url+"/api", {
        query: `
            mutation($email: String, $password: String) {
                authenticateUserWithPassword(email: $email, password: $password) {
                   token
                }
            }`,
        variables: {
            email,
            password
        }
    });
    if (!authenticateUserWithPassword) {
        return null;
    }
    localStorage.setItem("token", authenticateUserWithPassword.token);
    return authenticateUserWithPassword.token;
}

export async function logout(token) {
    if (!token) return;
    const { data: { data } } = await axios.post(url+"/api", {
        query: `
            mutation {
                unauthenticateUser {
                    success
                }
            }
            `
    });
    return data
}

export async function getLoggedUser(token) {
    if (!token) return null;
    const { data: { data: { authenticatedUser } } } = await axios.post(url+"/api", {
        query: `
            query {
                authenticatedUser {
                   id
                   name
                   email
                   rank {
                        name
                        abbreviation
                   }
                   state
                   strikes {
                        id
                   }
                   awards {
                        id
                   }
                }
            }
                    `
    }, {
        headers: {
            Authorization: "Bearer "+token
        }
    });
    if (!authenticatedUser) {
        localStorage.removeItem("user");
        return null;
    }
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    return authenticatedUser;
}

export async function sendGraphQLRequest(query, variables, token) {
    const config = token ? { headers: { Authorization: "Bearer " + token}} : {};
    const result = await axios.post(url+"/api", {
        query,
        variables
    }, config);
    return result.data;
}