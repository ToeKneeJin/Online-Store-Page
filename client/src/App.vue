<template>
  <div id="app">
    <header>
      <img src="https://via.placeholder.com/700x200.jpg">
    </header>
    <nav>
      <div id="nav-left">
      <router-link :to="{ name: 'home'}" class="link">Home</router-link>
      <router-link :to="{name : 'cart'}" class="link">Cart</router-link>
      </div>

      <div id="nav-message">
      <span>{{$store.state.message}}</span>
      </div>

      <div id="nav-right">
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token" class="link">Logout</router-link>
      <router-link v-bind:to="{ name: 'login' }" v-else class="link">Login</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <footer>
      <span>© 2022 All rights reserved</span>
    </footer>
  </div>
</template>

<style scoped>
#app{
  height: 100vh;
}

header{
  position:sticky;
  top: 0;
  width: 100%;
  height: 200px;
  background: url("../public/the_night_sky_starry.jpg");
}

img{
  display: block;
  margin-left: auto;
  margin-right: auto;
}

nav{
  position: sticky;
  top: 200px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "home-cart message login-logout";
  background-color: black;
}

.link{
  font-size: 18px;
  padding-right: 1em;
  padding-left: 1em;
  color: white;
}

#nav-left{
  grid-area: home-cart;
  text-align: left;
}

#nav-message{
  grid-area: message;
  text-align: center;
}

#nav-right{
  grid-area: login-logout;
  text-align: right;
}

footer{
  position: sticky;
  width: 95vw;
  bottom: 0;
  margin-left: 1em;
  height: 1.5em;
  background-color: black;
}



</style>