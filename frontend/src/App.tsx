import React from 'react';
import '@fontsource/inter';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import "./App.css"
import {CssVarsProvider} from "@mui/joy";
import Controller from "./pages/Controller/Controller";
import Player from "./pages/Player/Player";


function App() {
    return (
        <CssVarsProvider defaultMode="dark">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Home/>}>
                        <Route path="*" element={<Catalog/>}/>
                        <Route path="controller/*" element={<Controller/>}/>
                    </Route>

                    <Route path="/player" element={<Player/>}/>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    );
}

export default App;
