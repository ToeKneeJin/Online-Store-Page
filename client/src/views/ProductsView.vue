<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-grip"
        title="View tiles"
      />
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-table"
        title="View table"
      />
      <input type="text" placeholder="Search..." v-model="searchTerm" v-on:keyup.enter="filterProducts()" />
    </div>

    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }" class="link"
        >Login</router-link
      >
      to add items to your shopping cart.
    </p>

    <section id="product-cards" v-if="cardView">
      <article
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="sku">{{ product.productSku }}</div>
        <div class="price">{{ product.price }}</div>
        <div
          class="product-name"
          v-on:click="toProductDetail($event)"
          :id="product.productId"
        >
          {{ product.name }}
        </div>
        <div class="product-image">
          <img :src="product.imageName" :alt="product.imageName" />
        </div>
        <div class="cart">
          <font-awesome-icon
            :icon="['fas', 'cart-plus']"
            v-show="isLoggedIn"
            v-on:click="addToCart($event)"
            :id="product.productId"
          />
        </div>
      </article>
    </section>

    <section id="product-table" v-if="!cardView">
      <div id="title-table">
        <h2 class="sku-title">SKU</h2>
        <h2 class="product-title">Product</h2>
        <h2 class="price-title">Price</h2>
      </div>
      <article
        class="product-line"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="sku-line">{{ product.productSku }}</div>
        <div
          class="product-name-line"
          v-on:click="toProductDetail($event)"
          :id="product.productId"
        >
          {{ product.name }}
        </div>
        <div class="price-line">
          {{ product.price }}
          <font-awesome-icon
            :icon="['fas', 'cart-plus']"
            v-show="isLoggedIn"
            v-on:click="addToCart($event)"
            :id="product.productId"
            style="cursor:pointer"
          />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";

export default {
  name: "ProductsView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      searchTerm: "",
      isLoading: false,
      cardView: true,
      products: [],
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
      ProductService.getProducts(null, this.searchTerm)
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
          this.isLoading = false;
          this.$store.commit("SET_MESSAGE", "Welcome!");
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },

    toProductDetail(event) {
      this.$router.push({
        name: "product-detail",
        params: { id: event.target.id },
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
          this.$store.commit("SET_MESSAGE", error.response.data.message + " Try Again!");
        });
      
      item = {};
    },

    filterProducts(){
      this.isLoading = true;
      ProductService.getProducts(null, this.searchTerm)
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
          this.isLoading = false;
          this.$store.commit("SET_MESSAGE", "Results Filterd");
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },
    
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.loadData();
  },
};
</script>

<style scoped>
.link {
  color: white;
}

div.home {
  margin-left: 1em;
  margin-right: 1em;
  overflow: hidden;
}

#heading-line {
  display: flex;
  align-items: center;
}

h1 {
  flex-grow: 1;
  font-size: 20px;
}

input {
  margin-right: 0.5em;
}

#spinner {
  color: green;
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#product-cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

article.product-card {
  margin: 1em;
  padding: 0.5em 0.75em 0.5em 0.75em;
  width: 355px;
  border: 1px solid white;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "sku price"
    "product-name product-name"
    "image image"
    ". cart-icon";
}

div.sku {
  grid-area: sku;
}

div.price {
  grid-area: price;
  text-align: right;
}

div.product-name {
  grid-area: product-name;
  cursor: pointer;
  pointer-events: auto;
}


div.product-image {
  margin-top: 0.5em;
  grid-area: image;
}

div.cart {
  grid-area: cart-icon;
  text-align: right;
  cursor: pointer;
}

article.product-line {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "sku product price";
}

div.sku-line {
  grid-area: sku;
  text-align: center;
}

div.product-name-line {
  grid-area: product;
  cursor: pointer;
}

div.price-line {
  grid-area: price;
}

div.cart-line {
  grid-area: cart;
}

#title-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "sku product price";
}

.sku-title {
  grid-area: sku;
  text-align: center;
}

.sku-product {
  grid-area: product;
}

.sku-price {
  grid-area: price;
}
</style>