import {useEffect} from "react";
import init from "../../js/ya";
import {User} from "../../models/User.model";

function Login({onLogin}: { onLogin: (user: User) => void }) {

    function onGetToken(data: { access_token: string }) {
        login(data.access_token)
    }

    function login(access_token: string) {
        fetch(`/api/auth/login?access_token=${access_token}`, {method: "POST"})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((r: User) => onLogin(r))
    }

    useEffect(() => {
        init(onGetToken)
    }, [])

    return null;
}

export default Login;
