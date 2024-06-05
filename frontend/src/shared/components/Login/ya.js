function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name.trim() !== "JWT") {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

function init(callback) {
    deleteAllCookies()
    setTimeout(() => {
        window.YaAuthSuggest.init(
            {
                client_id: "828b96e3c94540bd88aef752b4ca605b",
                response_type: "token",
                redirect_uri: "https://pl.kppv.tech/token.html"
            },
            "https://pl.kppv.tech",
            {view: "default"}
        )
            .then(({handler}) => {
                return handler();
            })
            .then(data => {
                console.log('Сообщение с токеном', data);
                callback(data);
            })
            .catch(error => {
                console.log("Произошла ошибка", error);
            })
            .catch(error => {
                console.log("Обработка ошибки во втором then блоке", error);
            });
    }, 500)
}

export default init