<template>
  <div id="cart-view">
    <div id="heading-line">
      <h1>
        Shopping Cart
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <button v-on:click="clearCart()">
        <font-awesome-icon :icon="['fas', 'trash-can']" />
        Clear Cart
      </button>
    </div>
    <div id="table">
      <table>
        <thead>
          <tr>
            <td>Qty</td>
            <td>Product</td>
            <td>Price</td>
            <td>Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" v-bind:key="item.productId">
            <td>{{ item.quantity }}</td>
            <td
              v-on:click="toProductDetail($event)"
              :id="item.productId"
              class="clickable"
            >
              {{ item.product.name }}
            </td>
            <td>{{ item.product.price }}</td>
            <td>{{ item.quantity * item.product.price }}</td>
            <td
              v-on:click="removeItem(item.cartItemId)"
              class="clickable"
            >
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
    <div id="total">
      <table>
        <tbody>
          <tr>
            <td class="first-column">&nbsp;</td>
            <td class="second-column">Item Subtotal:</td>
            <td class="third-column">&nbsp;</td>
            <td>{{ cart.itemSubtotal }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td class="second-column">Tax:</td>
            <td class="third-column">&nbsp;</td>
            <td>{{ cart.tax }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td class="second-column">Total:</td>
            <td class="third-column">&nbsp;</td>
            <td>{{ cart.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import CartService from "../services/CartService";

export default {
  name: "CartView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      cart: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    loadData() {
      this.isLoading = true;
      CartService.getCart()
        .then((response) => {
          this.cart = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },

    clearCart() {
      CartService.clearCart();
      this.cart = null;
      this.loadData();
      this.$router.push({ name: "cart" });
    },

    toProductDetail(event) {
      this.$router.push({
        name: "product-detail",
        params: { id: event.target.id },
      });
    },

    removeItem(id) {
      CartService.removeItemFromCart(id);
      this.loadData();
      this.$router.push({ name: "cart" });
      this.loadData();
    },
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.loadData();
  },
};
</script>

<style scoped>
#cart-view {
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
  margin-bottom: 1em;
}

h1 {
  font-size: 24px;
}

#spinner {
  color: green;
}

#heading-line {
  display: flex;
  justify-content: space-between;
}

button {
  height: 2em;
  cursor: pointer;
}

th,
td {
  padding-left: 25px;
  padding-right: 25px;
}

hr {
  width: 600px;
  margin-left: 0;
}

.first-column {
  width: 25.23px;
}

.second-column {
  text-align: right;
  width: 100.83px;
}

.third-column {
  width: 103px;
}

.clickable {
  cursor: pointer;
}
</style>