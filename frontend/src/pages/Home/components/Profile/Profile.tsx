import React, {useEffect, useState} from 'react';
import {User} from "../../../../shared/models/User.model";
import './Profile.css'
import Login from "../../../../shared/components/Login/Login";


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
                return response.json();
            })
            .then((user: User) => setUser(user))
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
            <div className="profile">
                <img src={avatar} className="avatar"/>
                <h1>Привет, {user.firstName}!</h1>
            </div>
        );
    }
    return (
        <div className="profile">
            <h1>Привет!</h1>
            {login}
        </div>
    )
}

export default Profile;
