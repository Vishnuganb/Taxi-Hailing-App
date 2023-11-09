import React from "react";
import image from "../../assets/images/SignIn.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    CForm,
    CCol,
    CFormInput,
    CButton,
    CContainer,
    CRow,
    CCard,
    CCardBody,
    CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";
import { v_email, v_required } from "../../utils/validator";
import userService from "../../services/userService";

function Login() {
    // For the server side requests and responses
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    let navigate = useNavigate();

    // Form data
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    // Update the form data while input
    const onUpdateInput = (e) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // For data errors
    const [loginFormErrors, setLoginFormErrors] = useState({
        emailError: "",
        passwordError: "",
    });

    // Validate the data and
    // If valid send to the server
    // else show the errors
    const handleSubmit = async (e) => {
        e.preventDefault();

        let emailError = "";
        let passwordError = "";

        if (!v_required(loginForm.email)) {
            emailError = "Email can not be empty.";
        } else if (!v_email(loginForm.email)) {
            emailError = "Email is not valid.";
        }

        if (!v_required(loginForm.password)) {
            passwordError = "Password can not be empty.";
        }

        // If errors exist, show errors
        setLoginFormErrors({
            emailError,
            passwordError,
        });

        // If no errors exist, send to the server
        if (!(emailError || passwordError)) {
            // Sending to the server
            setLoading(true);

            const payload = {
                email: loginForm.email,
                password: loginForm.password,
            };

            userService.login(payload).then(
                (res) => {
                    console.log("Response", res);
                    if (res.type === "OK") {
                        toast.success(res.message);
                        sessionStorage.setItem("token", res.token);
                        sessionStorage.setItem("userid", res.payload.userid);
                        
                        if(res.payload.role === "PASSENGER"){
                            navigate('/passenger');
                        }

                    } else if (res.type === "BAD") {
                        toast.error(res.message);
                    }

                    setLoading(false);
                },
                (error) => {
                    const res =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    // After receiving the server request
                    toast.error(res);
                    setLoading(false);
                }
            );
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
      };

    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center", // Center the image
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100vh",
                display: "flex",
                overflow: "hidden",
                overflowY: "hidden",
                scrollbarWidth: "0",
                msOverflowStyle: "none",
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
            }}
        >
            <CCol md={5}>
                <CCard className="mx-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.89)" }}>
                    <CCardBody className="p-4">
                        <h1 className="text-center">Login</h1>
                        <p className="text-medium-emphasis text-center">
                            Please enter your credentials
                        </p>
                        <CForm className="row g-3">
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    id="validationServer01"
                                    name="email"
                                    label="Email"
                                    onChange={onUpdateInput}
                                    value={loginForm.email}
                                    feedback={loginFormErrors.emailError}
                                    invalid={loginFormErrors.emailError ? true : false}
                                />
                            </CCol>

                            <CCol md={12}>
                                <div style={{ position: "relative" }}>
                                    <CFormInput
                                        type={passwordVisible ? "text" : "password"}
                                        id="validationServer02"
                                        name="password"
                                        label="Password"
                                        onChange={onUpdateInput}
                                        value={loginForm.password}
                                        feedback={loginFormErrors.passwordError}
                                        invalid={loginFormErrors.passwordError ? true : false}
                                    />
                                    <div
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        title={
                                            passwordVisible
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        style={{
                                            position: "absolute",
                                            top: "2.3rem", // Adjust this value to position the icon closer to the input
                                            right: "10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />} 
                                    </div>
                                </div>
                            </CCol>

                            {/* <CCol md={12}>
                                <div className="forgot-dev">
                                    <a className="forgot" href="/forget-password">
                                        <p className="text-left">forgot password ?</p>
                                    </a>
                                </div>
                            </CCol>

                            <CCol md={12}>
                                <hr /> <p className="text-medium-emphasis text-center">or</p>
                            </CCol> */}

                            <div className="d-grid">
                                <CButton
                                    color="warning"
                                    className="py-2"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    <div className="fw-bold" style={{ color: "black" }}>
                                        Login {loading && <CSpinner size="sm" />}
                                    </div>
                                </CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </div>
    );
}

export default Login;
