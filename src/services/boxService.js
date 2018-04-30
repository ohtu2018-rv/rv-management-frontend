import axios from 'axios';

const targetUrl = 'api/v1/admin/boxes';

const getAll = token => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data);
};

const addStock = (barcode, box, token) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${
                barcode
            }`,
            {
                buyprice: box.buyprice * 100,
                product_id: box.product_id,
                sellprice: box.sellprice * 100,
                boxes: box.boxes
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        )
        .then(res => res.data);
};

export default {
    getAll,
    addStock
};
