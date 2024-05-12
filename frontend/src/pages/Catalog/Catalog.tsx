import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Catalog.css"

interface Item {
    name: string
    is_file: boolean,
    path: string
}

function Catalog() {

    const location = useLocation();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch(`/api/catalog/list?path=${location.pathname}`)
            .then(response => {
                return response.json();
            })
            .then((items: Item[]) => setItems(items))
    }, [location]);


    let catalog = items.map((item: Item) => {
        return <div className="card" key={item.name}>
            <Link to={item.path}>{item.name}</Link>
        </div>
    })

    return (
        <div className="catalog">
            {catalog}
        </div>
    )
}

export default Catalog;