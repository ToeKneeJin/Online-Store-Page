<template>
  <div id="detail-view">
    <div id="heading-line">
      <h1>
        {{ product.name }}
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <button v-on:click="addToCart($event)" :id="product.productId" v-show="isLoggedIn">
        <font-awesome-icon :icon="['fas', 'cart-plus']" />
        Add to Cart
      </button>
    </div>
    <h2>
      {{ product.description }}
    </h2>
    <span> {{ product.productSku }} {{ product.price }} </span>
    <span>
      {{ product.name }}
    </span>
    <div>
      <img :src="product.imageName" :alt="product.imageName" />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";

export default {
  name: "ProductDetailView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      product: null,
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
      ProductService.getProductById(this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },

    addToCart(event) {
      let item = {
        productId: event.target.id,
        userId: this.$store.state.user.id,
        quantity: 1,
      };

      CartService.addItemToCart(item)
        .then(this.$store.commit("SET_MESSAGE", "Sucessfully added!"))
        .catch((error) => {
          this.$store.commit(
            "SET_MESSAGE",
            error.response.data.message + " Try Again!"
          );
        });

      item = {};
    },
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.loadData();
  },
};
</script>

<style scoped>
#detail-view {
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
  margin-bottom: 1em;
}

h1 {
  font-size: 24px;
}

h2{
  font-size: 20px;
}

#heading-line {
  display: flex;
  justify-content: space-between;
}

#spinner {
  color: green;
}

button {
  height: 2em;
}

span {
  display: block;
  margin-bottom: 0.75em;
}
</style>