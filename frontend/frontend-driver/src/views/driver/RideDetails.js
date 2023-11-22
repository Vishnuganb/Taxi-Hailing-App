import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import backgroundImage from './../../assets/images/home12.png';

const StyledTabs = styled(Tabs)`
  & .nav-link.active {
    color: rgb(255, 154, 0) !important;
  }

  & .nav-link {
    color: black !important;
  }
`;

const serverLink = 'http://localhost:8002';

function RideDetails() {
  const [data, setData] = useState({
    currentPage: 1,
    showModal: false,
    totalPages: 1,
    searchTerm: '',
    activeTab: 'pending',
    filteredRides: [],
    displayedRides: [],
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
        setData({
          ...data,
          RidesData: detail,
          pendingRides: detail.filter((Ride) => Ride.status === 'pending'),
          finishedRides: detail.filter((Ride) => Ride.status === 'accepted' || Ride.status === 'finished'),
          displayedRides: detail.filter((Ride) => Ride.status === 'pending').slice(0, data.cardsPerPage),
        });
      } catch (error) {
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
      filteredRides = filteredRides.filter(
        (Ride) =>
          Ride.pickupLocation.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
          Ride.dropLocation.toLowerCase().includes(data.searchTerm.toLowerCase())
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

    axios
      .put(serverLink + '/auth/updateRideAcceptStatus', formData)
      .then((response) => {
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

    axios
      .put(serverLink + '/auth/updateRideFinishStatus', formData)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(() => {
        alert("Can't Update. Check Again");
      });
  };

  return (
    <div>
      <StyledTabs
        activeKey={data.activeTab}
        onSelect={(key) => handleTabChange(key)}
        className="m-3"
      >
        <Tab eventKey="pending" title="Pending"/>
        <Tab eventKey="finished" title="Finished" />
      </StyledTabs>

      <section
        id="service-page"
        className="block serviceProvider m-5 p-5"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          overflow: 'hidden',
          overflowY: 'hidden',
          scrollbarWidth: '0',
          msOverflowStyle: 'none',
          alignItems: 'center', // Center vertically
          justifyContent: 'center', // Center horizontally
        }}
      >
        <h1 className="ms-5 fw-bold align-self-start" style={{ color: 'rgb(255, 154, 0)' }}>
          Rides
        </h1>

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
                      <p className="card-text fw-bold d-none d-md-block">pickup Location: {Ride.pickupLocation}</p>
                      <p className="card-text fw-bold d-none d-md-block align-self-start">Drop Location: {Ride.dropLocation}</p>
                      {data.activeTab === 'pending' && (
                        <>
                          <button
                            className="btn m-1"
                            style={{ backgroundColor: 'rgb(255, 154, 0)', color: '#000' }}
                            onClick={() => setData({ ...data, showAcceptConfirmation: true, selectedRide: Ride })}
                          >
                            Accept
                          </button>
                          <button
                            className="btn m-1"
                            style={{ backgroundColor: '#000', color: '#fff' }}
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
        <Modal.Header closeButton style={{ background: '#ff9a00', color: '#000' }}>
          <Modal.Title>Confirm Acceptance</Modal.Title>
        </Modal.Header>
        {data.selectedRide && (
          <Modal.Body className="centered-body">
            <div className="mt-2 bordered-paragraph rounded">
              <span style={{ color: '#9F390D', fontWeight: 'bold' }}>From: {data.selectedRide.pickupLocation} </span>
            </div>
            <div className="mt-2 bordered-paragraph rounded">
              <span style={{ color: '#9F390D', fontWeight: 'bold' }}>To: {data.selectedRide.dropLocation} </span>
            </div>
            <p className='fw-bold pt-4'>Are you sure you want to accept this Ride?</p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button className='btn-effect2' onClick={() => setData({ ...data, showAcceptConfirmation: false })} style={{ background: '#ff9a00', color: '#000' }}>
            No
          </Button>
          <Button className='btn-effect' onClick={() => handleAcceptRide(data.selectedRide.rideId)} style={{ background: '#ff9a00', color: '#000', marginLeft: '10px' }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RideDetails;
