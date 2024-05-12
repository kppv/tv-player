import React from "react";
import Profile from "./components/Profile/Profile";
import {Outlet} from "react-router-dom";

function Home() {
    return (
        <div>
            <Profile/>
            <Outlet/>
        </div>
    )
}

export default Home;