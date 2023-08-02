import axios from 'axios';

export default {

  getCart(){
      return axios.get('/cart');
  },

  addItemToCart(cartItem){
      return axios.post('/cart/items', cartItem);
  },

  removeItemFromCart(id){
      return axios.delete('/cart/items/' + id);
  },

  clearCart(){
      return axios.delete('/cart')
  }

}
