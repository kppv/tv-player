import React, {useEffect, useState} from 'react';
import {User} from "../../../../shared/models/User.model";
import './Profile.css'
import Login from "../../../../shared/components/Login/Login";
import {Avatar, Box, Typography} from "@mui/joy";
import {Stack} from "@mui/material";


function Profile({onAuth}: { onAuth: (success: boolean) => void }) {

    const [user, setUser] = useState<User | null>(null);
    let [needLogin, setNeedLogin] = useState(false);

    function getCurrentUser() {
        fetch(`/api/user/current`)
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    setNeedLogin(true)
                    return null;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                onAuth(true)
                return response.json();
            })
            .then((user: User) => {
                setUser(user)
            })
    }


    function onLogin(user: User) {
        setUser(user)
        onAuth(true)
    }

    useEffect(() => {
        getCurrentUser()
    }, []);


    let login = needLogin ? <Login onLogin={onLogin}/> : null

    if (user) {
        const avatar = `https://avatars.yandex.net/get-yapic/${user.defaultAvatarId}/islands-200`
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{marginTop: '16px'}}>
                    <Avatar src={avatar} size="lg"/>
                </Box>
                <Typography color="neutral" level="h2" variant="plain">
                    Привет, {user.firstName}!
                </Typography>
            </Stack>
        );
    }
    return (
        <div className="profile">
            <Typography color="neutral" level="h2" variant="plain">
                Привет!
            </Typography>
            {login}
        </div>
    )
}

export default Profile;
