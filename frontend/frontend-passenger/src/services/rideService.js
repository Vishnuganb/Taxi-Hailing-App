import axios from 'axios';

const API_BASE_URL = 'http://localhost:8003';

const rideService = {
    findDriver: async (payload) => {
        try {
            console.log("Payload", payload);
            const response = await axios.post(`${API_BASE_URL}/rides/create`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default rideService;

