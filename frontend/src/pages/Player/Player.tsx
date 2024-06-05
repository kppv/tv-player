import {Button, Stack} from "@mui/joy";
import {useCallback, useEffect, useRef, useState} from "react";
import {PlayArrowRounded} from "@mui/icons-material";

function Player() {

    const VIDEO_PATH = "https://pl.kppv.tech"
    const [started, setStarted] = useState(false);
    const [data, setData] = useState("");
    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [connected, setConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        ws.current = new WebSocket("/sock/control/command"); // создаем ws соединение
        ws.current.onopen = () => setConnected(true);	// callback на ивент открытия соединения
        ws.current.onclose = () => setConnected(false); // callback на ивент закрытия соединения
        gettingData();

        return () => ws.current?.close();
    }, [ws]);


    const gettingData = useCallback(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
            setData(e.data);
            const data = JSON.parse(e.data)
            let src = data?.params?.path;
            if (src) {
                setTitle(decodeURIComponent(src.split("/").pop()))
                setSrc(src)
            }
            playerAction(data.name)
        };
    }, []);

    function playerAction(action: string) {
        if (vidRef && vidRef.current && started) {
            if (vidRef) {
                if (action === "play") {
                    vidRef.current?.play();
                }
                if (action === "stop") {
                    vidRef.current?.pause();
                }
                if (action === "fullscreen") {
                    vidRef.current?.requestFullscreen();
                }
                if (action === "forward") {
                    vidRef.current.currentTime = vidRef.current.currentTime + 10;
                }
                if (action === "replay") {
                    vidRef.current.currentTime = vidRef.current.currentTime - 10;
                }
            }
        }
    }

    let content = <>
        <Button size="lg" startDecorator={<PlayArrowRounded/>} onClick={() => setStarted(true)}>Начать</Button>
    </>

    if (started) {
        content = <>
            <div style={{color: "white"}}>{title}</div>
            <video ref={vidRef}
                   controls
                   width="640"
                   preload="auto">
                <source
                    src={VIDEO_PATH + src}/>
            </video>
        </>
    }

    return <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{height: '100vh'}}
    >
        {content}
    </Stack>
}

export default Player;