import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/auth';

const rideService = {
    findDriver: async (payload) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/rides/create`, payload);
            const response2 = await checkRideStatus(response.data);
            console.log("Response2", response2);
            return response2;
        } catch (error) {
            alert("Already have a ride");
        }
    },
};

const checkRideStatus = async (response) => {
    try {
        const response2 = await axios.post(`${API_BASE_URL}/confirmation`, response);
        console.log("Confirmation Response", response2.data);

        if (response2.data.message === "Ride Accepted") {
            console.log("Ride Accepted. Returning response:", response2.data.message);
            return response2.data;
        } else if (response2.data.message === "Ride Pending") {
            console.log("Ride Pending. Recursive call...");
            return checkRideStatus(response);
        } else {
            console.error("Unexpected response from server");
        }
    } catch (error) {
        console.error("Error checking ride status", error);
    }
};


export default rideService;
