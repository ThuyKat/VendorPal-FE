import axios from 'axios';

export async function loginUser(credentials) {
    try {
        const response = await axios.post('http://localhost:8080/api/login', credentials);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            throw new Error(error.response.data.error || 'Login failed');
        } else if (error.request) {
            // Request was made but no response received (network error)
            throw new Error('Network error - please check your connection');
        } else {
            // Something else happened
            throw new Error('Login failed');
        }
    }
}
