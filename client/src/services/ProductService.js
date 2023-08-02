import axios from "axios";

export default{
    getProducts(skuSearchTerm, nameSearchTerm){
        if(skuSearchTerm == null && nameSearchTerm == null){
            return axios.get('/products');
        } else if (skuSearchTerm != null && nameSearchTerm == null){
            return axios.get('/products?sku=' + skuSearchTerm);
        } else if (skuSearchTerm == null && nameSearchTerm != null){
            return axios.get('/products?name=' + nameSearchTerm);
        } else{
            return axios.get('/products?sku=' + skuSearchTerm + '&name=' + nameSearchTerm);
        }
    },


    getProductById(id){
        return axios.get('/products/' + id)
    }


}