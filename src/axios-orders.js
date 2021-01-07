import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://kpburger-builder-default-rtdb.firebaseio.com/'
});

export default instance;