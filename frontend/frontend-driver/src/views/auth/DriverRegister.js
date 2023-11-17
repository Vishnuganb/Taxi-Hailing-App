import React from "react";
import image from "../../assets/images/SignIn.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert } from "react-bootstrap";

import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton,
    CCard,
    CCardBody,
    CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";

import {
    v_email,
    v_required,
    v_min,
    v_inRange,
    v_match,
    v_passwordRequirements,
} from "../../utils/validator";

import userService from "../../services/userService";

function DriverRegister() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    // Form data
    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        confirmPassword: "",
    });

    // Update the form data while input
    const onUpdateInput = (e) => {
        setRegisterForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (e.target.name === "dob") {
            validateDobAge(e.target.value);
        }
    };

    // For data errors
    const [registerFormErrors, setRegisterFormErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        phoneError: "",
        addressError: "",
        emailError: "",
        dobError: "",
        genderError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let firstNameError = "";
        let lastNameError = "";
        let phoneError = "";
        let addressError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";
        let dobError = "";
        let genderError = "";

        if (!v_required(registerForm.firstName)) {
            firstNameError = "First name can not be empty.";
        }

        if (!v_required(registerForm.lastName)) {
            lastNameError = "Last name can not be empty.";
        }

        if (!v_required(registerForm.phone)) {
            phoneError = "Phone can not be empty.";
        } else if (!v_min(registerForm.phone, 10)) {
            phoneError = "Phone number is not valid.";
        }

        if (!v_required(registerForm.address)) {
            addressError = "Address can not be empty.";
        }

        if(!v_required(registerForm.dob)){
            dobError = "Date of birth can not be empty.";
        }

        if(!v_required(registerForm.gender)){
            genderError = "Please Select the gender"
        }

        if (!v_required(registerForm.email)) {
            emailError = "Email can not be empty.";
        } else if (!v_email(registerForm.email)) {
            emailError = "Email is not valid.";
        }

        if (!v_required(registerForm.password)) {
            passwordError = "Password can not be empty.";
        } else if (!v_passwordRequirements(registerForm.password)) {
            passwordError = "Password is not valid.";
        }

        if (!v_required(registerForm.confirmPassword)) {
            confirmPasswordError = "Confirm password can not be empty.";
        } else if (!v_match(registerForm.password, registerForm.confirmPassword)) {
            confirmPasswordError = "Passwords are not matched.";
        }

        // If errors exist, show errors
        setRegisterFormErrors({
            firstNameError,
            lastNameError,
            phoneError,
            addressError,
            emailError,
            dobError,
            genderError,
            passwordError,
            confirmPasswordError,
        });

        // If no errors exist, send to the server
        if (
            !(
                firstNameError ||
                lastNameError ||
                phoneError ||
                addressError ||
                emailError ||
                dobError ||
                genderError ||
                passwordError ||
                confirmPasswordError
            )
        ) {
            // Sending to the server
            setLoading(true);

            const payload = {
                firstName: registerForm.firstName,
                lastName: registerForm.lastName,
                phone: registerForm.phone,
                address: registerForm.address,
                email: registerForm.email,
                dob: registerForm.dob,
                gender : registerForm.gender,
                password: registerForm.password,
            };

            userService.driverRegister(payload).then(
                (res) => {
                    if (res.type === "OK") {
                        toast.success(res.message, { autoClose: 2000 });
                        setLoading(false);
                        navigate("/login");
                    } else if (res.type === "BAD") {
                        toast.error(res.message);
                        setLoading(false);
                    }
                },
                (error) => {
                    const res =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    // After recieving the server request
                    toast.error(res);
                    setLoading(false);
                }
            );
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conformPasswordVisible, setConformPasswordVisible] = useState(false);
    const [dobAgeError, setDobAgeError] = useState("");

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
      };

    const toggleConformPasswordVisibility = () => {
        setConformPasswordVisible((prev) => !prev);
      };

      const validateDobAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        if (age < 18) {
            setDobAgeError("Driver must be at least 18 years old.");
            return false;
        } else {
            setDobAgeError("");
            return true;
        }
    };

    const passwordHintMessage = (password) => {
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const symbolRegex = /[@#$%^&+=]/; // Customize this pattern for the symbols you require
    
        const hints = [];
    
        if (!uppercaseRegex.test(password)) {
            hints.push("Password should contain at least one uppercase letter.");
        }
        if (!digitRegex.test(password)) {
            hints.push("Password should contain at least one digit (0-9).");
        }
        if (!symbolRegex.test(password)) {
            hints.push("Password should contain at least one symbol.");
        }
    
        if (hints.length === 0) {
            return "Password meets all requirements.";
        }
    
        return hints.join(" ");
    };    
    

    return (
        <div className=" bg-light d-flex flex-row align-items-center h-100"
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
        }}>
            <CCol md={5}>
                <CCard className="m-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.89)" }}>
                    <CCardBody className="p-4">
                        <h1 className="text-center">Sign up</h1>
                        <p className="text-medium-emphasis text-center">
                            Please enter your details
                        </p>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    id="validationServer02"
                                    name="firstName"
                                    label="First name"
                                    onChange={onUpdateInput}
                                    value={registerForm.firstName}
                                    feedback={registerFormErrors.firstNameError}
                                    invalid={registerFormErrors.firstNameError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    id="validationServer03"
                                    name="lastName"
                                    label="Last name"
                                    onChange={onUpdateInput}
                                    value={registerForm.lastName}
                                    feedback={registerFormErrors.lastNameError}
                                    invalid={registerFormErrors.lastNameError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    id="validationServer01"
                                    name="email"
                                    label="Email"
                                    onChange={onUpdateInput}
                                    value={registerForm.email}
                                    feedback={registerFormErrors.emailError}
                                    invalid={registerFormErrors.emailError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    id="validationServer04"
                                    name="phone"
                                    label="Phone"
                                    onChange={onUpdateInput}
                                    value={registerForm.phone}
                                    feedback={registerFormErrors.phoneError}
                                    invalid={registerFormErrors.phoneError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="date"
                                    id="validationServer04"
                                    name="dob"
                                    label="Date of Birth"
                                    onChange={onUpdateInput}
                                    value={registerForm.dob}
                                    feedback={registerFormErrors.dobError || dobAgeError}
                                    invalid={registerFormErrors.dobError || dobAgeError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormSelect
                                    id="validationServer08"
                                    name="gender"
                                    label="Gender"
                                    onChange={onUpdateInput}
                                    value={registerForm.gender}
                                    feedback={registerFormErrors.genderError}
                                    invalid={registerFormErrors.genderError ? true : false}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    id="validationServer05"
                                    name="address"
                                    label="Address"
                                    onChange={onUpdateInput}
                                    value={registerForm.address}
                                    feedback={registerFormErrors.addressError}
                                    invalid={registerFormErrors.addressError ? true : false}
                                />
                            </CCol>
                            <CCol md={6}>
                                <div style={{ position: "relative" }}>
                                    <CFormInput
                                        type={passwordVisible ? "text" : "password"}
                                        id="validationServer06"
                                        name="password"
                                        label="Password"
                                        onChange={onUpdateInput}
                                        value={registerForm.password}
                                        feedback={registerFormErrors.passwordError}
                                        invalid={registerFormErrors.passwordError ? true : false}
                                    />
                                    <div
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        title={passwordVisible ? "Hide password" : "Show password"}
                                        style={{
                                            position: "absolute",
                                            top: "2.3rem",
                                            right: "10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </div>
                                </div>
                            </CCol>
                            <CCol md={6}>
                                <div style={{ position: "relative" }}>
                                    <CFormInput
                                        type= {conformPasswordVisible ? "text" : "password"}
                                        id="validationServer07"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        onChange={onUpdateInput}
                                        value={registerForm.confirmPassword}
                                        feedback={registerFormErrors.confirmPasswordError}
                                        invalid={
                                            registerFormErrors.confirmPasswordError ? true : false
                                        }
                                    />
                                    <div
                                            className="password-toggle"
                                            onClick={toggleConformPasswordVisibility}
                                            title={
                                                conformPasswordVisible
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            style={{
                                                position: "absolute",
                                                top: "2.3rem", 
                                                right: "10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                        {conformPasswordVisible ? <Visibility /> : <VisibilityOff />}
                                    </div>
                                </div>
                            </CCol>

                            {registerForm.password && (
                                <Alert variant="info" className="my-2 p-2 rounded">
                                    <strong>info:</strong>
                                    <p className="d-flex justify-content-center">{passwordHintMessage(registerForm.password)}</p>
                                </Alert>
                            )}

                            <div className="d-grid">
                                <CButton
                                    color="warning"
                                    className="py-2"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    <div className="fw-bold" style={{ color: "black" }}>
                                        Register {loading && <CSpinner size="sm" />}
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

export default DriverRegister;