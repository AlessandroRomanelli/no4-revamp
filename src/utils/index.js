import axios from "axios";

export async function login(email, password) {
    const { data: { data: { authenticateUserWithPassword } } } = await axios.post("http://localhost:3000/api", {
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

export async function getLoggedUser(token) {
    if (!token) return null;
    const { data: { data: { authenticatedUser } } } = await axios.post("http://localhost:3000/api", {
        query: `
            query {
                authenticatedUser {
                   id
                   name
                   email
                   role {
                        name
                   }
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
    const result = await axios.post("http://localhost:3000/api", {
        query,
        variables
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return result.data;
}