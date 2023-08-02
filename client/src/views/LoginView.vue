<template>
  <div id="login">
    <form v-on:submit.prevent="login" id="login-form">
      <h1>Please Sign In</h1>
      <div id="fields">
        <section id="username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        </section>
        <section id="pw">
        <label for="password">Password </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        </section>
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
#login{
  padding-top: 1em;
  padding-bottom: 1.5em;
  margin-top: 10vh;
  margin-bottom: 20vh;
  margin-left: auto;
  margin-right: auto;
  color: black;
  background: rgba(221, 221, 214, 0.8);
  width: 30vw;
  opacity: 30;
}

#login-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  }

#fields{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

input{
  min-width: 50px;
}

</style>
