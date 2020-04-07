import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../utils";

export default function Logout() {
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const data = await logout(store.token);
            console.log(data);
            if (data.unauthenticateUser.success) {
                console.log("Successfully logged out");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                dispatch({
                    type: "clear_user"
                })
            }
        } catch (e) {
            console.error(e.response ? e.response : e);
        }


    };

    return <a href={"#"} onClick={handleLogout}>
        <span>Logout</span>
    </a>;
}