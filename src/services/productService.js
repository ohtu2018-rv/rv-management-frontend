import axios from 'axios';

const products = [
    {
        id: 1,
        name: 'Twix'
    },
    {
        id: 2,
        name: 'Tupla'
    },
    {
        id: 3,
        name: 'Mars'
    },
    {
        id: 4,
        name: 'Snickers'
    },
    {
        id: 5,
        name: 'Toblerone'
    },
    {
        id: 6,
        name: 'Dacapo'
    },
    {
        id: 7,
        name: 'Jim'
    },
    {
        id: 8,
        name: 'Marianne'
    },
    {
        id: 9,
        name: 'Milka'
    },
    {
        id: 10,
        name: 'Oreo'
    }
];

const getAll = (token) => {
    // Dummy
    return new Promise((resolve, reject) => 
        setTimeout(() => resolve(products), 500));


    /* Real deal.
    return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/${url-to-product-endpoint}`,
        {
            headers: { Authorization: 'Bearer ' + token }
        }
    ).then(res => res.data)
    */
};

export default { getAll };