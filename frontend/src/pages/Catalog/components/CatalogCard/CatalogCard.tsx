import {CatalogItem} from "../../Catalog.model";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Typography} from "@mui/joy";
import {PlayArrow} from "@mui/icons-material";

function CatalogCard({item}: { item: CatalogItem }) {
    const navigate = useNavigate();

    if (item.is_file) {
        return <Card variant="soft" sx={{width: 300}} key={item.name}>
            <div>
                <Typography level="title-md">{item.name}</Typography>
            </div>
            <Button component="a" href="#as-link" startDecorator={<PlayArrow/>}>
                Воспроизвести
            </Button>
        </Card>
    }
    return <Card variant="soft" sx={{width: 300}} onClick={() => navigate(item.path)} key={item.name}>
        <div>
            <Typography level="title-md">{item.name}</Typography>
        </div>
    </Card>
}

export default CatalogCard;