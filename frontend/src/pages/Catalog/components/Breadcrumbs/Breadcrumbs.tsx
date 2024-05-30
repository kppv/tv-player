import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {Chip} from "@mui/joy";

function Breadcrumbs() {
    const location = useLocation();
    const navigate = useNavigate();

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

    return <>{breadcrumbs}</>;
}

function generatePathArray(path: string): string[] {
    path = path.replace("controller", "")
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

export default Breadcrumbs;