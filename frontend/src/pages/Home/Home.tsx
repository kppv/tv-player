import React from "react";
import Profile from "./components/Profile/Profile";
import {Outlet} from "react-router-dom";

function Home() {
    const [isLogin, setIsLogin] = React.useState(false)

    let outlet = <></>

    if (isLogin) {
        outlet = <Outlet/>
    }

    return (
        <div>
            <Profile onAuth={(success) => setIsLogin(success)}/>
            {outlet}
        </div>
    )
}

export default Home;