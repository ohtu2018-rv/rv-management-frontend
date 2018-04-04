import axios from 'axios';

const targetUrl = 'api/v1/admin/products';

const getAll = token => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data);
};

const addStock = (token, product) => {

    return axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/product/${product.id}`,
            {
                buyprice: product.buyprice * 100,
                margin: product.margin,
                sellprice: product.sellprice * 100,
                quantity: product.quantity,
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            })
        .then(res => product = {
            ...res.data,
            buyprice: res.data.buyprice / 100,
            sellprice: res.data.sellprice / 100            
        });
};

export default {
    getAll,
    addStock
};
