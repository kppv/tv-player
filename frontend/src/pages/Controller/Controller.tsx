import {useLocation} from "react-router-dom";
import {ReactElement, useEffect, useRef, useState} from "react";
import {IconButton, Stack} from "@mui/joy";
import {Forward10Rounded, FullscreenRounded, PlayArrowRounded, Replay10Rounded, StopRounded} from "@mui/icons-material";

// TODO навести порядок, вынести компоненты

enum CommandName {
    PLAY = "play",
    STOP = "stop",
    REPLAY = "replay",
    FORWARD = "forward",
    FULLSCREEN = "fullscreen"
}

interface Command {
    icon: ReactElement,
    command: {
        name: CommandName,
        action: { (): void } | null,
        params: any
    }
}

function Controller() {
    let path = useLocation().pathname.replace("/controller", "");

    const [currentCommandName, setCurrentCommandName] = useState(CommandName.STOP);
    const [connected, setStatus] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("/sock/control/command"); // создаем ws соединение
        ws.current.onopen = () => setStatus(true);	// callback на ивент открытия соединения
        ws.current.onclose = () => setStatus(false); // callback на ивент закрытия соединения
        return () => ws.current?.close(); // кода меняется isPaused - соединение закрывается
    }, [ws]);


    const commands = [
        {
            icon: <Replay10Rounded/>,
            command: {
                name: CommandName.REPLAY,
                params: null,
                action: null
            }
        },

        {
            icon: <PlayArrowRounded/>,
            command: {
                name: CommandName.PLAY,
                params: {path: path},
                action: () => setCurrentCommandName(CommandName.PLAY)
            }
        },
        {
            icon: <StopRounded/>,
            command: {
                name: CommandName.STOP,
                params: {path: path},
                action: () => setCurrentCommandName(CommandName.STOP)
            }
        },

        {
            icon: <Forward10Rounded/>,
            command: {
                name: CommandName.FORWARD,
                params: null,
                action: null
            }
        },
        {
            icon: <FullscreenRounded/>,
            command: {
                name: CommandName.FULLSCREEN,
                params: null,
                action: null
            }
        }];


    function sendCommand(command: Command) {
        if (ws.current) {
            ws.current.send(JSON.stringify(command.command));
        }
        if (command.command.action) {
            command.command.action();
        }
    }

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}
               sx={{marginTop: "20px"}}>
            {commands
                .filter((c) => c.command.name !== currentCommandName)
                .map((cmd, index) => (
                    <IconButton key={index} sx={{"--IconButton-size": "90px"}} disabled={!connected}
                                onClick={() => sendCommand(cmd)}>
                        {cmd.icon}
                    </IconButton>
                ))}
        </Stack>
    );
}

export default Controller;