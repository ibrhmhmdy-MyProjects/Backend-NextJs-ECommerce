const {default: axiosClient} = require('./axiosClient');

const getLatestProducts = ()=> axiosClient.get('/products?populate=*');
const getProductsById = (id)=> axiosClient.get(`/products/${id}?populate=*`);
const getProductsByCategory = (category)=> axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);
export default {
    getLatestProducts,
    getProductsById,
    getProductsByCategory,
}