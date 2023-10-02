import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import{Login} from "./pages/login";
import { Resset } from "./pages/resset";
import { Trailer } from "./pages/trailer-single";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import{Registration} from "./pages/registration";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Detail />} path="/detail/:movieId" />
                        <Route element={<Trailer />} path="/trailer/:movieId" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Registration />} path="/registration" />
                        <Route element={<Resset/>} path="/resset" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
