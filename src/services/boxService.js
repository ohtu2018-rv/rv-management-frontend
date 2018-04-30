import axios from 'axios';

const targetUrl = 'api/v1/admin/boxes';

const getAll = token => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data);
};

export default {
    getAll,
    
};
