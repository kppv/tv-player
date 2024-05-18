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

    let s: string | undefined = location.pathname.split("/").pop()
    let title = "Каталог"
    if (s) {
        title = decodeURIComponent(s)
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

                <Chip>{title}</Chip>
                {catalog}
            </Stack>
        </>
    )
}

export default Catalog;