<template>
  <div id="app" class="m-0 p-0">
    <!-- <div class="overlay"> --><b-overlay
      :show="state.show"
      rounded="sm"
      :variant="'dark'"
      :opacity="1"
    >
      <div id="nav" class="py-3 w-100">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <router-view class="w-100" />
      <!-- </div> -->
      <template #overlay>
        <div class="text-center text-light">
          <div>
            <img
              src="./assets/logo/Light mode/SVG/Artboard 1.svg"
              width="200"
              height="200"
              class="logo-img"
              alt=""
            />
          </div>
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p class="my-3" id="cancel-label">Please wait...</p>
        </div>
        <b-progress
          :value="state.progress_value"
          :max="state.progress_max"
          show-value
          class="mb-3"
        ></b-progress>
      </template>
    </b-overlay>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
export default {
  setup() {
    const state = reactive({
      show: true,
      progress_value: 0,
      progress_max: 100,
      timer: 0,
    });

    onMounted(() => {
      startTimer();
    });

    function startTimer() {
      state.timer = setInterval(() => {
        let num = Math.random(Math.floor()) * 8;
        console.log(num);
        state.progress_value = state.progress_value += num;
        if (state.progress_value >= 100) {
          clearInterval(state.timer);
          state.show = false;
        }
      }, 300);
    }

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

.b-overlay {
  height: 100vh;
}

.progress {
  width: 65vw;
}

@import url("./style/style.css");
</style>
