import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const serverLink = 'http://localhost:8002/auth';

class UserService{

    driverRegister = async (payload) => {
        console.log("Payload", payload);
        try {
            const response = await axios.post(serverLink + '/driverRegister', payload);
            console.log("Response", response);
            return response.data;
        } catch (error) {
            // Handle the error
            console.log("Error", error);
        }
    };

    login = async (payload) => {
        console.log("Payload", payload);
        try {
            const response = await axios.post(serverLink + '/login', payload);
            console.log("Response", response);
            if (response.data.payload) {
                localStorage.setItem("user", JSON.stringify(response.data.payload));
            }
            return response.data;
        } catch (error) {
            // Handle the error
            console.log("Error", error);
        }
    };

    logout () {
        localStorage.removeItem("user");
    };

    getUser () {
        return JSON.parse(localStorage.getItem("user"));
    };

}

export default new UserService;
