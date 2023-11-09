import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import profileIcon from "../../assets/images/user.jpg";
import validator from "validator";
import { set } from "lodash";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Alert } from 'react-bootstrap';

const serverLink = 'http://localhost:8080';

const DriverEditProfile = (props) => {

    const [data, setdata] = useState({
        email: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        address: '',
        password: '',
        newPassword: '',
        errorMessage: 'Password requires to have at least one lowercase, one uppercase, one number, one symbol, and be a minimum of 8 characters in length',
        emailStatus: false,
        passwordType: 'password',
        isPasswordHidden: true,
        errorMessageStatus: false,
        emailErrorMessage: '',
        firstNameErrorMessage: '',
        lastNameErrorMessage: '',
        contactNumberErrorMessage: '',
        addressErrorMessage: '',
        passwordErrorMessage: '',
        newPasswordErrorMessage: '',
        showMore: false,
    });

    const [userDetail, setUserDetail] = useState([]);
    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(serverLink + '/auth/getUserById/' + userData.userid);
            if (response.data) {
                setUserDetail(response.data);
                setdata({
                    ...data,
                    email: response.data.email,
                    firstName: response.data.firstname,
                    lastName: response.data.lastname,
                    contactNumber: response.data.phonenumber,
                    address: response.data.address,
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const showHidePassword = () => {
        if (data.isPasswordHidden) {
            setdata({ ...data, passwordType: 'text', isPasswordHidden: false });
        } else {
            setdata({ ...data, passwordType: 'password', isPasswordHidden: true });
        }
    };

    const handleSave = async () => {

        let isError = false;

        if (data.firstName === "") {
            isError = true;
            console.log("image changed1");
            setdata({ ...data, firstNameErrorMessage: "First name is required" });
        } else if (data.lastName === "") {
            isError = true;
            console.log("image changed2");
            setdata({ ...data, lastNameErrorMessage: "Last name is required" });
        } else if (data.contactNumber === "") {
            isError = true;
            console.log("image changed3");
            setdata({ ...data, contactNumberErrorMessage: "Contact number is required" });
        } else if (data.address === "") {
            isError = true;
            console.log("image changed4");
            setdata({ ...data, addressErrorMessage: "Address is required" });
        } else if (data.nicNumber === "") {
            isError = true;
            console.log("image changed5");
            setdata({ ...data, nicNumberErrorMessage: "Nic number is required" });
        } else if (!validator.isNumeric(data.contactNumber)) {
            isError = true;
            console.log("image changed8");
            setdata({ ...data, contactNumberErrorMessage: "Invalid contact number" });
        } else if (data.contactNumber.length !== 10) {
            isError = true;
            console.log("image changed9");
            setdata({ ...data, contactNumberErrorMessage: "Invalid contact number" });
        } else if (data.newPassword.length > 0 || data.password.length > 0) {
            try {
                const passwordMatches = await bcrypt.compare(data.password, userDetail.password);
                console.log(passwordMatches);
                if (!passwordMatches) {
                    isError = true;
                    setdata({
                        ...data,
                        passwordErrorMessage: "Current password is incorrect",
                    });
                    return;
                }
            } catch (error) {
                console.error("Error comparing passwords:", error);
            }
        }
        else {
            setdata({
                ...data,
                firstNameErrorMessage: "",
                lastNameErrorMessage: "",
                contactNumberErrorMessage: "",
                addressErrorMessage: "",
                passwordErrorMessage: "",
                nicNumberErrorMessage: "",
            });
        }

        if (!isError) {

            const formData = new FormData();

            if (data.imageSrc !== profileIcon) {
                formData.append("profilePic", data.imageSrc);
            }

            if (data.firstName !== userDetail.firstname) {
                formData.append("firstName", data.firstName);
            }

            if (data.lastName !== userDetail.lastname) {
                formData.append("lastName", data.lastName);
            }

            if (data.contactNumber !== userDetail.phonenumber) {
                formData.append("phoneNumber", data.contactNumber);
            }

            if (data.address !== userDetail.address) {
                formData.append("address", data.address);
            }

            if (bcrypt.compare(data.password, userDetail.password)) {
                formData.append("password", data.newPassword);
            }

            formData.append("userId", userDetail.userid);

            axios.put(serverLink + '/auth/updateUser', formData).then(

                (response) => {

                    window.location.reload();
                    console.log(response.data);

                }

            ).catch(

                () => { alert("Error!!!") }

            )

            props.onHide(true);

        }

    };

    return (
        <Container>
            <Modal {...props} centered>

                <Modal.Header closeButton style={{ background: "#282b3d", color: "#fff" }}>
                    <Modal.Title id="contained-modal-title-vcenter"> My Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex">
                    <div>
                        <Form className="my-2 mx-4">

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='me-0 col-sm-6'>
                                    <p className="mb-0 align-items-end">First Name</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.firstName}
                                        onChange={(e) => {
                                            setdata({ ...data, firstName: e.target.value });
                                        }}
                                        required
                                    />
                                    {data.firstNameErrorMessage && <p className="text-danger p-0 m-0">{data.firstNameErrorMessage}</p>}
                                </div>

                                <div className='col-sm-5'>
                                    <p className="mb-0">Last Name</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.lastName}
                                        onChange={(e) => {
                                            setdata({ ...data, lastName: e.target.value });
                                        }}
                                        required
                                    />
                                    {data.lastNameErrorMessage && <p className="text-danger p-0 m-0">{data.lastNameErrorMessage}</p>}
                                </div>
                            </div>

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='me-0 col-sm-6'>
                                    <p className="mb-0 align-self-start">Email</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.email}
                                        required
                                    />
                                    {data.emailErrorMessage && <p className="text-danger p-0 m-0">{data.emailErrorMessage}</p>}
                                </div>

                                <div className='col-sm-5'>
                                    <p className="mb-0">phoneNumber</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.contactNumber}
                                        onChange={(e) => {
                                            setdata({ ...data, contactNumber: e.target.value });
                                        }}
                                        required
                                    />
                                    {data.contactNumberErrorMessage && <p className="text-danger p-0 m-0">{data.contactNumberErrorMessage}</p>}
                                </div>
                            </div>

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='me-0 col-sm-12'>
                                    <p className="mb-0 align-self-start">Address</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.address}
                                        onChange={(e) => {
                                            setdata({ ...data, address: e.target.value });
                                        }}
                                        required
                                    />
                                    {data.addressErrorMessage && <p className="text-danger p-0 m-0">{data.addressErrorMessage}</p>}
                                </div>
                            </div>
                            <>
                                <div className="mt-3">


                                    {data.showMore && (
                                        <>
                                            <div className='mb-3'>
                                                <p className="mb-0">Current Password</p>
                                                <div className="input-group">
                                                    <input
                                                        type={data.passwordType}
                                                        className="form-control"
                                                        placeholder="Enter your Current password"
                                                        value={data.password}
                                                        onChange={(e) => setdata({ ...data, password: e.target.value })}
                                                        required
                                                    />
                                                    <span className="input-group-text">
                                                        <button
                                                            className="btn btn-outline-dark border-0"
                                                            type="button"
                                                            id="button-addon1"
                                                            onClick={showHidePassword}
                                                        >
                                                            {data.isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                                        </button>
                                                    </span>
                                                </div>
                                                {data.passwordErrorMessage && <p className="text-danger p-0 m-0">{data.passwordErrorMessage}</p>}
                                            </div>

                                            <div className="mb-3">
                                                <p className="mb-0 align-items-end">New Password</p>
                                                <div className="input-group">
                                                    <input
                                                        type={data.passwordType}
                                                        value={data.newPassword}
                                                        className="form-control"
                                                        placeholder="Enter your New password"
                                                        onChange={(e) => {
                                                            const passwordInputValue = e.target.value;

                                                            if (validator.isStrongPassword(passwordInputValue, {
                                                                minLength: 8, minLowercase: 1, minUppercase: 1,
                                                                minNumbers: 1, minSymbols: 1
                                                            })) {
                                                                setdata({ ...data, newPassword: passwordInputValue, errorMessageStatus: false });
                                                            } else {
                                                                setdata({ ...data, newPassword: passwordInputValue, errorMessageStatus: true });
                                                            }
                                                        }}
                                                    />
                                                    <span className="input-group-text">
                                                        <button
                                                            className="btn btn-outline-dark border-0"
                                                            type="button"
                                                            id="button-addon1"
                                                            onClick={showHidePassword}
                                                        >
                                                            {data.isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                                        </button>
                                                    </span>
                                                </div>
                                                {data.newPasswordErrorMessage && <p className="text-danger p-0 m-0">{data.newPasswordErrorMessage}</p>}
                                            </div>

                                            {data.errorMessageStatus && (
                                                <Alert variant="info" className="my-0 p-2 mb-2 rounded" dismissible>
                                                    <strong>info</strong>
                                                    <p className="d-flex justify-content-center"></p>{data.errorMessage}
                                                </Alert>
                                            )}
                                        </>
                                    )}

                                    <div className="mt-3">
                                        <Button className="btn-effect3" type="button" onClick={() => setdata({ ...data, showMore: !data.showMore })} style={{ width: 'auto' }}>
                                            {data.showMore ? 'Show Less' : 'Change Password'}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
                        <Button className="btn-effect me-2" type="button" onClick={handleSave}>
                            Save
                        </Button>
                        <Button className="btn-effect2 me-1" type="button" onClick={() => props.onHide(true)}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DriverEditProfile;