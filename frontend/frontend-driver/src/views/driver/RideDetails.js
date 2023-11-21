import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Modal, Button, Form, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { set } from 'lodash';


const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-end;
    `;

const serverLink = 'http://localhost:8003';

function RideDetails() {

    const [data, setData] = useState({
        currentPage: 1,
        showModal: false,
        totalPages: 1,
        searchTerm: '',
        activeTab: 'pending',
        filteredRides: [],
        displayedRides: [],
        showDetailsModal: false,
        selectedRide: null,
        cardsPerPage: 3,
        showAcceptConfirmation: false,
        showFinishedConfirmation: false,
        enable: true,
        RidesData: [],
        pendingRides: [],
        finishedRides: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllRideDetails');
                const detail = response.data;
                console.log(detail);
                const trainingRides = detail.trainingRides;
                setData({
                    ...data,
                    RidesData: trainingRides,
                    pendingRides: trainingRides.filter((Ride) => Ride.status === 'pending'),
                    finishedRides: trainingRides.filter((Ride) => Ride.status === 'finished'),
                    displayedRides: trainingRides.filter((Ride) => Ride.status === 'pending').slice(0, data.cardsPerPage),

                })
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * data.cardsPerPage;
        const endIndex = startIndex + data.cardsPerPage;
        const filteredData = data.filteredRides[data.activeTab];
        const displayedRides = filteredData.slice(startIndex, endIndex);

        setData({
            ...data,
            currentPage: page,
            displayedRides,
        });

    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            searchTerm: value,
        }));
    };

    const handleTabChange = (tab) => {

        setData((prevState) => ({
            ...prevState,
            activeTab: tab,
            currentPage: 1,
            displayedRides: getDisplayedRides(tab),
        }));
    };

    const getDisplayedRides = (tab) => {

        let filteredRides;

        switch (tab) {
            case 'pending':
                filteredRides = data.pendingRides || [];
                break;
            case 'finished':
                filteredRides = data.finishedRides || [];
                break;
            default:
                filteredRides = [];
        }

        if (data.searchTerm !== '') {
            filteredRides = filteredRides.filter((Ride) =>
                Ride.pickupLocation.toLowerCase().includes(data.searchTerm.toLowerCase()) 
            );
        }

        return filteredRides.slice(0, data.cardsPerPage);
    };


    useEffect(() => {
        const totalPages = Math.ceil(getDisplayedRides(data.activeTab).length / data.cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            displayedRides: getDisplayedRides(data.activeTab),
            currentPage: 1,
        }));
    }, [data.searchTerm, data.activeTab]);

    const handleAcceptRide = (rideId) => {
        const formData = new FormData();
        formData.append('status', 'accepted');
        formData.append('rideId', rideId);
    
        axios.put(serverLink + '/auth/updateRideAcceptStatus', formData)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(() => {
                alert("Can't Update. Check Again");
            });
    };

    const handleFinishRide = (rideId) => {
        const formData = new FormData();
        formData.append('status', 'finished');
        formData.append('rideId', rideId);
    
        axios.put(serverLink + '/auth/updateRideFinishStatus', formData)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(() => {
                alert("Can't Update. Check Again");
            });
    };

    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="pending" title="Pending" />
                <Tab eventKey="finished" title="Finished" />
            </Tabs>

            <section id="service-page" className="block serviceProvider m-5 p-5" >

                <h2 className="ms-5 fw-bold align-self-start">Rides</h2>

                <div className="d-flex align-items-center justify-content-center w-100">

                    <div className='col-xs-2 col-sm-3 col-md-2 col-lg-2 col-xl-2 m-3 me-xs-5'>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={data.searchTerm}
                                onChange={handleSearchChange}
                            />
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center mt-4">
                    {data.displayedRides &&
                    data.displayedRides.map((Ride) => {
                        return (
                            <Card key={Ride.id} className="m-3">
                                <Card.Body className="d-flex flex-column align-items-center">
                                    <div className="d-flex flex-column justify-content-center text-center">
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: 'gray' }}
                                            onClick={() => setData({ ...data, showDetailsModal: true, selectedRide: Ride })}
                                        >
                                            More Details
                                        </button>
                                        {data.activeTab === 'pending' && (
                                            <>
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: "#687699" }}
                                                    onClick={() => handleAcceptRide(Ride.id)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: "#000" }}
                                                    onClick={() => handleFinishRide(Ride.id)}
                                                >
                                                    Finish
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>

                <div className="pagination justify-content-center">
                    {Array.from({ length: data.totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-link ${data.currentPage === index + 1 ? 'active' : ''}`}
                            style={{ backgroundColor: '#292D32', color: '#fff' }}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </section>

            <Modal show={data.showAcceptConfirmation} onHide={() => setData({ ...data, showAcceptConfirmation: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Confirm Acceptance</Modal.Title>
                </Modal.Header>
                {data.selectedRide && (
                    <Modal.Body className="centered-body">
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Title: </span> 
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to accept this Ride?</p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect2' onClick={() => setData({ ...data, showAcceptConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={handleAcceptRide}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Training Ride Details</Modal.Title>
                </Modal.Header>
                {data.selectedRide && (
                    <Modal.Body className="text-start">
                        <div className="row">
                            <div className="col-12">
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>pickup Location: </span>
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Drop Location: </span>
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Vehicle Type: </span>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                )}
                <StyledModalFooter>
                    <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
                        <Button className="btn-effect3 me-2" onClick={() => setData({ ...data, showDetailsModal: false })}>
                            Cancel
                        </Button>
                    </div>
                </StyledModalFooter>

            </Modal>
        </div>
    );
}

export default RideDetails;