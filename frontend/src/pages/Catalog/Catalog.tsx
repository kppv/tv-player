import {Card, Chip, IconButton, Stack, Typography} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./Catalog.css"
import {ArrowBack, Home} from "@mui/icons-material";

interface Item {
    name: string
    is_file: boolean,
    path: string
}

function Catalog() {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch(`/api/catalog/list?path=${location.pathname}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return [];
            })
            .then((items: Item[]) => setItems(items))
    }, [location]);

    let catalog = items.map((item: Item) => {
        return <Card variant="soft" sx={{width: 300}} onClick={() => navigate(item.path)} key={item.name}>
            <div>
                <Typography level="title-md">{item.name}</Typography>
                <Typography level="body-sm">Description of the card.</Typography>
            </div>
        </Card>
    })

    let paths = generatePathArray(location.pathname)

    let breadcrumbs = [<Chip key="catalog" onClick={() => navigate("/")}>Каталог</Chip>]

    if (paths) {
        paths
            .filter((path) => path !== "")
            .forEach((path => breadcrumbs.push(
                <Chip key={path} onClick={() => navigate(path)}>
                    {decodeURIComponent(path.split("/").pop() as string)}
                </Chip>
            )))
    }


    return (
        <>
            <Stack spacing={2}
                   direction="column"
                   justifyContent="center"
                   alignItems="center">
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
                        <Home onClick={() => navigate("/")}/>
                    </IconButton>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{flexWrap: 'wrap', gap: 1}}
                >
                    {breadcrumbs}
                </Stack>
                {catalog}
            </Stack>
        </>
    )
}

function generatePathArray(path: string): string[] {
    // Убираем начальный слэш и делим путь по символу '/'
    const parts = path.split('/').filter(part => part !== '');

    // Инициализация массива для результатов
    const result: string[] = [];

    // Переменная для накопления пути
    let currentPath = '';

    // Проходимся по всем частям пути и накапливаем их
    for (const part of parts) {
        currentPath += `/${part}`;
        result.push(currentPath);
    }

    return result;
}

export default Catalog;