import axios from 'axios';

const SERVER_URL = 'http://localhost:8081'

export const createUser = async (name, email, password, isCoach) => {
    try {
        const response = await axios.post(`${SERVER_URL}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
