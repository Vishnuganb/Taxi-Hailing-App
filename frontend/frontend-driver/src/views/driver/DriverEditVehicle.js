import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import validator from "validator";
import { set } from "lodash";
import axios from 'axios';
import vehiclesData from './vehicles.json';

const serverLink = 'http://localhost:8002';

const DriverEditVehicle = (props) => {

    const [data, setdata] = useState({
        vehicleNumber: '',
        vehicleType: '',
        file: null,
        vehicleNumberErrorMessage: '',
        vehicleTypeErrorMessage: '',
        fileErrorMessage: '',
        showMore: false,
    }); 

    const [userDetail, setUserDetail] = useState([]);
    const response = sessionStorage.getItem('userid');
    const userData = JSON.parse(response);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(serverLink + '/auth/getVehicleUserById/' + userData);
            if (response.data) {
                setUserDetail(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSave = async () => {

        let isError = false;

        if (data.vehicleNumber === "") {
            isError = true;
            console.log("image changed1");
            setdata({ ...data, vehicleNumberErrorMessage: "Vehicle number is required" });
        } else if (data.vehicleType === "") {
            isError = true;
            console.log("image changed2");
            setdata({ ...data, vehicleTypeErrorMessage: "Vehicle type is required" });
        }  else if (data.file === null) {
            isError = true;
            console.log("image changed8");
            setdata({ ...data, fileErrorMessage: "License is required" });
        } else {
            setdata({
                ...data,
                firstNameErrorMessage: "",
                lastNameErrorMessage: "",
                fileErrorMessage: "",
            });
        }

        if (!isError) {

            const formData = new FormData();

            if (data.vehicleNumber !== userDetail.vehicleNumber) {
                formData.append("vehicleNumber", data.vehicleNumber);
            }

            if (data.vehicleType !== userDetail.vehicleType) {
                formData.append("vehicleType", data.vehicleType);
            }

            if (data.file !== userDetail.file) {
                formData.append("file", data.file);
            }

            formData.append("driverId", userDetail.driverid);

            axios.put(serverLink + '/auth/updateVehicle', formData).then(

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

    const handleCancel = () => {
        setdata({
            ...data,
            vehicleNumberErrorMessage: "",
            vehicleTypeErrorMessage: "",
            fileErrorMessage: "",
        });
        props.onHide(true);
    }

    return (
        <Container>
            <Modal {...props} centered>

                <Modal.Header closeButton style={{ background: "#ff9a00", color: "#000" }}>
                    <Modal.Title id="contained-modal-title-vcenter">Vehicle Details</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex">
                    <div>
                        <Form className="my-2 mx-4">

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='me-0 col-sm-12'>
                                    <p className="mb-0 align-items-end">Vehicle Number</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.vehicleNumber}
                                        onChange={(e) => {
                                            setdata({ ...data, vehicleNumber: e.target.value });
                                        }}
                                        required
                                    />
                                    {data.vehicleNumberErrorMessage && <p className="text-danger p-0 m-0">{data.vehicleNumberErrorMessage}</p>}
                                </div>
                            </div>

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='col-sm-12'>
                                    <p className="mb-0">Vehicle Type</p>
                                    <select
                                        className="form-select"
                                        value={data.vehicleType}
                                        onChange={(e) => {
                                            setdata({ ...data, vehicleType: e.target.value });
                                        }}
                                        required
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        {vehiclesData.map(vehicle => (
                                            <option key={vehicle.id} value={vehicle.name}>
                                                {vehicle.name}
                                            </option>
                                        ))}
                                    </select>
                                    {data.vehicleTypeErrorMessage && <p className="text-danger p-0 m-0">{data.vehicleTypeErrorMessage}</p>}
                                </div>
                            </div>

                            <div className="justify-content-between mb-3 d-flex">
                                <div className='me-0 col-sm-12'>
                                    <p className="mb-0 align-self-start">License</p>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => {
                                            setdata({ ...data, file: e.target.files[0] });
                                        }}
                                        required
                                    />
                                    {data.fileErrorMessage && <p className="text-danger p-0 m-0">{data.fileErrorMessage}</p>}
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
                        <Button className="btn-effect me-2" type="button" onClick={handleSave} style={{ background: "#ff9a00", color: "#000" }}>
                            Save
                        </Button>
                        <Button className="btn-effect2 me-1" type="button" onClick={handleCancel} style={{ background: "#ff9a00", color: "#000" }}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DriverEditVehicle;