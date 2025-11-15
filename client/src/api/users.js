import axios from 'axios';

const SERVER_URL = 'http://localhost:8081'

export const createUser = async (content) => {
    try {
        const response = await axios.post(`${SERVER_URL}/users`, { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};
