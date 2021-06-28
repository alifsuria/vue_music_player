<template>
    <transition name="slide-fade" mode="in-out">
      <div class="sidebar d-flex" ref="sidebarRef" v-if="sidebar">
        <div
          id="close-list"
          @click="$emit('sidebar-triggering',false)"
          class="
            track-button
            d-flex
            justify-content-center
            align-items-center
            h-100
          "
        >
          <font-awesome-icon :icon="['fas', 'angle-right']" size="4x" />
        </div>
        <!-- List -->
        <div id="list">
          <ul class="list-unstyled p-3">
            <li
              v-for="(music, index) in playlist"
              :key="music.src"
              class="d-flex track-button"
              @click="$emit('choose-song', index)"
            >
              <span
                v-if="
                  music === playlist[song_index] &&
                  status.playing === true &&
                  playlist[song_index].show === false
                "
                class="mx-3 index"
              >
                <font-awesome-icon :icon="['fas', 'play']" />
              </span>
              <span
                v-else-if="
                  music === playlist[song_index] &&
                  status.paused === true &&
                  playlist[song_index].show === false
                "
                class="mx-3 index"
              >
                <font-awesome-icon :icon="['fas', 'pause']" />
              </span>
              <span v-else class="mx-3 index">{{ index + 1 }}</span>

              <p
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  w-100
                  underline
                "
              >
                <span class="title">{{ music.title }}</span>
                <span class="timestamp">{{ music.duration }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </transition>

</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  props: ["playlist"],
  setup(_, { root }) {
    const sidebar = computed(() => root.$store.state.sidebar);
    const song_index = computed(() => root.$store.state.song_index);
    const status = computed(()=>root.$store.state.status)
    return { sidebar, song_index ,status};
  },
};
</script>

<style>
@import url("../style/style.css");
</style>