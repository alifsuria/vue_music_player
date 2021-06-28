<template>
  <div id="app" class="m-0 p-0">
    <!-- <div class="overlay"> -->
    <div id="nav" class="py-3 w-100">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- <b-overlay :show="state.show" rounded="sm"> -->
    <router-view class="w-100" />
    <!-- </b-overlay> -->

    <!-- </div> -->
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  setup() {
    const state = reactive({
      show: false,
    });

    return { state };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("./assets/marius-masalar-rPOmLGwai2w-unsplash.jpg") no-repeat
    rgb(83, 82, 82);
  background-size: cover;
  background-blend-mode: multiply;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
}

.margin-top {
  margin-top: 84px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@import url("./style/style.css")
</style>
