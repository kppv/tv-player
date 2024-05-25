import {IconButton, Stack} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowBack, Home} from "@mui/icons-material";
import {CatalogItem} from "./Catalog.model";
import CatalogCard from "./components/CatalogCard/CatalogCard";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";


function Catalog() {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState<CatalogItem[]>([]);

    useEffect(() => {
        fetch(`/api/catalog/list?path=${location.pathname}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return [];
            })
            .then((items: CatalogItem[]) => setItems(items))
    }, [location]);

    let catalog = items.map((item: CatalogItem) => {
        return <CatalogCard item={item} key={item.path}/>
    })

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
                    <Breadcrumbs/>
                </Stack>
                {catalog}
            </Stack>
        </>
    )
}

export default Catalog;