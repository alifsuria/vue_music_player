<template>
  <b-row class="d-flex mx-auto bordering my-3" no-gutters>
    <b-col class="text-light border-left-right">
      <div>
        <p class="mb-0 display-font">Current track</p>
        <hr class="middle" />
        <span class="display-font">{{ song_index + 1 }}</span>
      </div>
    </b-col>
    <b-col class="text-light border-left-right">
      <div>
        <p class="mb-0 display-font">Total tracks</p>
        <hr class="middle" />
        <span class="display-font">{{ playlist.length }}</span>
      </div>
    </b-col>
    <b-col class="text-light border-left-right">
      <div>
        <p class="mb-0 display-font">Current time</p>
        <hr class="middle" />
        <span class="display-font">{{ current_time }}</span>
      </div>
    </b-col>
    <b-col class="text-light d-flex justify-content-center">
      <div>
        <p class="mb-0 display-font">Current time</p>
        <hr class="middle" />
        <span class="display-font">{{ playlist[song_index].duration }}</span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  props: ["playlist", "current_time"],
  setup(_, { root }) {
    const song_index = computed(() => root.$store.state.song_index);

    return { song_index };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url("../style/style.css");
</style>
