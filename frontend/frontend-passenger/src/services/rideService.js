import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const rideService = {
    findDriver: async (payload) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/rides/find-driver`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default rideService;
