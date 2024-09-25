import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import About from "../pages/about/About";
import Menu from "../pages/menu/Menu";
import NotFound from "../pages/not-found/NotFound";
import Dish from "../pages/detailed-dish/Dish";

const MainRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/meal/">
                <Route path=":id" element={<Dish/>}/>
                <Route path="" element={<NotFound/>}/>
            </Route>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    )
}
export default MainRoute;