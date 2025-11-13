import axios from 'axios';

const SERVER_URL = 'http://localhost:8081'

export const createUser = async (userDTO, headers) => {
    try {
        await axios.post(`${SERVER_URL}/users`, {userDTO}, {headers});
    } catch (error) {
        console.log(error)
        throw error;
    }
};
