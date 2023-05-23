import React, { useContext} from "react";
import Protected from "../../Routes/Protected";
import { AuthContext, UserContext } from "../../Context";

const Dashboard = () => {
    const {isLoggedIn, handleLogout } = useContext(AuthContext);
    const {user, tasks } = useContext(UserContext);

    return(
        <Protected isLoggedIn={isLoggedIn}>
            <h1>Dashboard</h1>
            <p>Hello {user.email}</p>
            <button onClick={handleLogout}>Log out</button>
        </Protected>
    )
}

export default Dashboard;