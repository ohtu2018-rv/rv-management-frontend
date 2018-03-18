import axios from 'axios';

const targetUrl = 'api/v1/admin/margin' 

const getMargin = (token) => {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`,
        {
            headers: { Authorization: 'Bearer ' + token }
        }
    ).then(res => res.data)
};

const changeMargin = (newMargin, token) => {
    return axios(
        `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`,
        {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + token },
            data: {
                margin: newMargin
            }
        }
    ).then(res => res.data)
};

export default { getMargin, changeMargin };