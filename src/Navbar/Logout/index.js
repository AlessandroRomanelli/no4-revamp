import React from "react";

import axios from "axios";
import {useDispatch} from "react-redux";

export default function Logout() {
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:3000/api", {
            query: `
            mutation {
                unauthenticateUser {
                    success
                }
            }
            `
        });

        if (data.data.unauthenticateUser.success) {
            console.log("Successfully logged out");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch({
                type: "clear_user"
            })
        }
    };

    return <a href={"#"} onClick={handleLogout}>
        <span>Logout</span>
    </a>;
}