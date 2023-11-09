import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { CContainer } from "@coreui/react";

import AppFooter from "../components/footer/AppFooter";

import userService from "../services/userService";
import PassengerNavbar from "../components/navbar/PassengerNavbar";

function PassengerLayout(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        userType: "",
    });

    useEffect(() => {
        if (props.public !== true) {
            const userToken = userService.getUser();

            if (userToken !== null) {
                setUser((prev) => ({
                    ...prev,
                    username: userToken.firstName,
                    userType: userToken.role,
                }));
            } else {
                toast.error("User token not found");
                navigate("/login");
            }
        }
    }, []);

    return (
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <PassengerNavbar user={user} />
            <ToastContainer autoClose={2000} />
            <div className="body flex-grow-1">
                {props.page}
            </div>
            <AppFooter />
        </div>
    );
}

export default PassengerLayout;