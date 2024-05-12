import React from 'react';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import "./App.css"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Home/>}>
                    <Route path="*" element={<Catalog/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
