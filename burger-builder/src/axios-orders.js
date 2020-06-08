import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f6d2b.firebaseio.com/'
});

export default instance;