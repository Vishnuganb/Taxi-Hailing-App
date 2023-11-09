import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { CContainer } from "@coreui/react";

import AppNavbar from "../components/navbar/AppNavbar";
import AppFooter from "../components/footer/AppFooter";

function MainLayout(props) {
    return (
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppNavbar/>
            <ToastContainer autoClose={2000} />
            <div className="body flex-grow-1">
                {props.page}
            </div>
            <AppFooter />
        </div>
    );
}

export default MainLayout;