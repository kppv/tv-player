import {Stack} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {CatalogItem} from "./Catalog.model";
import CatalogCard from "./components/CatalogCard/CatalogCard";


function Catalog() {
    const location = useLocation();
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
                   alignItems="center"
                   sx={{marginTop: '20px'}}>
                {catalog}
            </Stack>
        </>
    )
}

export default Catalog;