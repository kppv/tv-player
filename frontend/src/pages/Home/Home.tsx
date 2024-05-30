import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {IconButton, Stack} from "@mui/joy";
import Profile from "./components/Profile/Profile";
import {ArrowBack, Home as HomeIcon} from "@mui/icons-material";
import Breadcrumbs from "../Catalog/components/Breadcrumbs/Breadcrumbs";

function Home() {
    const [isLogin, setIsLogin] = React.useState(false)
    const navigate = useNavigate();
    let outlet = <></>
    let navigation = <></>

    if (isLogin) {
        outlet = <Outlet/>
        navigation = <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <IconButton>
                    <ArrowBack onClick={() => navigate(-1)}/>
                </IconButton>
                <IconButton>
                    <HomeIcon onClick={() => navigate("/")}/>
                </IconButton>
            </Stack>

            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{flexWrap: 'wrap', gap: 1}}
            >
                <Breadcrumbs/>
            </Stack>
        </>
    }

    return (
        <>
            <Stack spacing={1}
                   direction="column"
                   justifyContent="center"
                   alignItems="center">
                <Profile onAuth={(success) => setIsLogin(success)}/>
                {navigation}
            </Stack>
            {outlet}
        </>
    )
}

export default Home;